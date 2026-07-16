import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

type RepresentativeSyncPayload = {
  crmUserId?: string
  name?: string
  company?: string | null
  email?: string
  phone?: string
  states?: string[]
  region?: string | null
  territories?: RepresentativeTerritoryPayload[]
  markets?: string[]
  displayOrder?: number
}

type RepresentativeTerritoryPayload = {
  key?: string | null
  uf?: string
  macroRegion?: string
  cities?: string[]
  ibgeCodes?: string[]
  dddCodes?: string[]
  priority?: number
  isExclusive?: boolean
  status?: string
  notes?: string | null
}

type ExistingRepresentative = {
  id: number
  crmUserId?: string | null
  email?: string | null
}

type RepresentativeResolution =
  | { kind: 'create' }
  | { kind: 'update'; representative: ExistingRepresentative }
  | { kind: 'conflict' }

function getBearerToken(value: string | null) {
  const match = value?.match(/^Bearer\s+(.+)$/i)
  return match?.[1]?.trim() ?? null
}

function isAuthorized(request: Request) {
  const expected = process.env.REPRESENTATIVES_SYNC_SECRET
  if (!expected) return false

  return getBearerToken(request.headers.get('authorization')) === expected
}

function normalizePayload(input: RepresentativeSyncPayload) {
  const name = input.name?.trim()
  const email = input.email?.trim().toLowerCase()
  const phone = input.phone?.trim()
  const crmUserId = input.crmUserId?.trim()
  const territories = normalizeTerritories(input.territories)
  const statesFromPayload = Array.isArray(input.states)
    ? [...new Set(input.states.map((state) => state.trim().toUpperCase()).filter(Boolean))]
    : []
  const statesFromTerritories = territories.map((territory) => territory.uf)
  const states = [...new Set([...statesFromPayload, ...statesFromTerritories])].sort()

  if (!crmUserId || !name || !email || !phone || states.length === 0) {
    return null
  }

  return {
    crmUserId,
    name,
    company: input.company?.trim() || null,
    email,
    phone,
    states,
    region: input.region?.trim() || null,
    territories,
    markets: Array.isArray(input.markets) ? [...new Set(input.markets)] : [],
    displayOrder: input.displayOrder ?? 999,
  }
}

function normalizeTerritories(territories?: RepresentativeTerritoryPayload[]) {
  if (!Array.isArray(territories)) {
    return []
  }

  return territories
    .map((territory) => {
      const uf = territory.uf?.trim().toUpperCase()
      const macroRegion = territory.macroRegion?.trim()

      if (!uf || !macroRegion) {
        return null
      }

      return {
        key: territory.key?.trim() || null,
        uf,
        macroRegion,
        cities: Array.isArray(territory.cities) ? territory.cities.map((city) => city.trim()).filter(Boolean) : [],
        ibgeCodes: Array.isArray(territory.ibgeCodes) ? territory.ibgeCodes.map((code) => code.trim()).filter(Boolean) : [],
        dddCodes: Array.isArray(territory.dddCodes) ? territory.dddCodes.map((code) => code.trim()).filter(Boolean) : [],
        priority: Number.isInteger(territory.priority) ? territory.priority : 999,
        isExclusive: territory.isExclusive === true,
        status: territory.status?.trim() || 'needs_review',
        notes: territory.notes?.trim() || null,
      }
    })
    .filter((territory): territory is NonNullable<typeof territory> => Boolean(territory))
}

function isGenericContactEmail(email: string) {
  return email === 'contato@bebiluminacao.com'
}

async function findExistingRepresentative(
  crmUserId: string,
  email: string,
): Promise<RepresentativeResolution> {
  const payload = await getPayload({ config })

  const byCrmUser = await payload.find({
    collection: 'representatives' as any,
    where: {
      crmUserId: { equals: crmUserId },
    },
    limit: 2,
    overrideAccess: true,
  })

  if (byCrmUser.docs.length > 1) {
    return { kind: 'conflict' }
  }

  const primary = byCrmUser.docs[0] as ExistingRepresentative | undefined

  if (primary) {

    if (isGenericContactEmail(email)) {
      return { kind: 'update', representative: primary }
    }

    const byEmail = await payload.find({
      collection: 'representatives' as any,
      where: {
        email: { equals: email },
      },
      limit: 20,
      overrideAccess: true,
    })

    const hasAnotherRecord = (byEmail.docs as ExistingRepresentative[])
      .some((doc) => doc.id !== primary.id)

    return hasAnotherRecord
      ? { kind: 'conflict' }
      : { kind: 'update', representative: primary }
  }

  if (isGenericContactEmail(email)) {
    return { kind: 'create' }
  }

  const byEmail = await payload.find({
    collection: 'representatives' as any,
    where: {
      email: { equals: email },
    },
    limit: 2,
    sort: 'createdAt',
    overrideAccess: true,
  })

  if (byEmail.docs.length === 0) {
    return { kind: 'create' }
  }

  if (byEmail.docs.length > 1) {
    return { kind: 'conflict' }
  }

  const legacyRecord = byEmail.docs[0] as ExistingRepresentative
  if (legacyRecord.crmUserId) {
    return { kind: 'conflict' }
  }

  return { kind: 'update', representative: legacyRecord }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json().catch(() => null) as RepresentativeSyncPayload | null
  const data = body ? normalizePayload(body) : null

  if (!data) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
  }

  const payload = await getPayload({ config })
  const resolution = await findExistingRepresentative(data.crmUserId, data.email)

  if (resolution.kind === 'conflict') {
    return NextResponse.json({
      error: 'Conflito de identidade do representante. Revise os cadastros antes de sincronizar.',
      code: 'REPRESENTATIVE_IDENTITY_CONFLICT',
    }, { status: 409 })
  }

  if (resolution.kind === 'update') {
    const updated = await payload.update({
      collection: 'representatives' as any,
      id: resolution.representative.id,
      data: data as any,
      overrideAccess: true,
    })

    return NextResponse.json({ ok: true, id: updated.id, action: 'updated' })
  }

  const created = await payload.create({
    collection: 'representatives' as any,
    data: data as any,
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true, id: created.id, action: 'created' }, { status: 201 })
}
