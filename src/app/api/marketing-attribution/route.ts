import { NextRequest, NextResponse } from 'next/server'

const MAX_VALUE_LENGTH = 2048
const ALLOWED_FIELDS = new Set([
  'form_type', 'lead_cluster', 'page_path', 'page_location', 'page_referrer',
  'first_landing_page', 'first_referrer', 'utm_source', 'utm_medium',
  'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid',
])

function stringRecord(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const result: Record<string, string> = {}
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === 'string' && item.length <= MAX_VALUE_LENGTH) result[key] = item
  }
  return result
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const attribution = stringRecord(body?.attribution)
  const channel = body?.channel

  if (!attribution || (channel !== 'form' && channel !== 'whatsapp')) {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 422 })
  }

  const crmApiKey = process.env.CRM_API_KEY
  const crmApiUrl = process.env.CRM_API_URL?.replace(/\/$/, '')
  if (!crmApiKey || !crmApiUrl) {
    return NextResponse.json({ error: 'Captura de atribuição indisponível' }, { status: 503 })
  }

  const payload: Record<string, unknown> = { channel, payload: attribution }
  for (const [key, value] of Object.entries(attribution)) {
    if (ALLOWED_FIELDS.has(key)) payload[key] = value
  }

  try {
    const response = await fetch(`${crmApiUrl}/api/marketing-attribution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${crmApiKey}` },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('marketing_attribution_crm_failed', { status: response.status })
      return NextResponse.json({ error: 'Captura de atribuição indisponível' }, { status: 502 })
    }

    const result = await response.json()
    return NextResponse.json({ public_id: result.public_id, expires_at: result.expires_at }, { status: 201 })
  } catch (error) {
    console.error('marketing_attribution_crm_unreachable', {
      message: error instanceof Error ? error.message : 'unknown_error',
    })
    return NextResponse.json({ error: 'Captura de atribuição indisponível' }, { status: 502 })
  }
}
