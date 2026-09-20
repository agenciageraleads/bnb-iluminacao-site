// Server-only. Envia lead de formulário do site pro CRM (atribuição + oportunidade),
// no mesmo padrão já usado pelo catálogo (src/app/actions/leads.ts) e pelo formulário
// de representante (src/app/api/leads/representative/route.ts).
//
// Best-effort de propósito: se o CRM estiver fora do ar, a submissão do usuário não pode
// falhar por causa disso — o e-mail via Resend continua sendo a rede de segurança.

export const ATTRIBUTION_FIELDS = [
  'formType',
  'leadCluster',
  'page_path',
  'page_location',
  'page_referrer',
  'first_landing_page',
  'first_referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
] as const

export function readAttribution(formData: FormData): Record<string, FormDataEntryValue> {
  return Object.fromEntries(
    ATTRIBUTION_FIELDS
      .map((field) => [field, formData.get(field)])
      .filter(([, value]) => Boolean(value)),
  )
}

export function digitsOnly(value: string | null | undefined) {
  return String(value || '').replace(/\D/g, '')
}

interface SyncSiteLeadToCrmInput {
  formType: string
  leadCluster: string
  attribution: Record<string, FormDataEntryValue>
  name: string
  whatsapp?: string
  document?: string
  companyName?: string
  category?: string
  demand: string
  sourceReference: string
  pipelineSlug?: string
}

/**
 * Cria o touch de atribuição e sincroniza a oportunidade no CRM.
 * Nunca lança — falhas são logadas e retornam `false`, pro chamador seguir com o e-mail.
 */
export async function syncSiteLeadToCrm(input: SyncSiteLeadToCrmInput): Promise<boolean> {
  const crmApiUrl = process.env.CRM_API_URL
  const crmApiKey = process.env.CRM_API_KEY

  if (!crmApiUrl || !crmApiKey) {
    console.error(`[${input.formType}] CRM_API_URL/CRM_API_KEY não configurados — lead não sincronizado com o CRM`)
    return false
  }

  const baseUrl = crmApiUrl.replace(/\/$/, '')

  try {
    const attributionResponse = await fetch(`${baseUrl}/api/marketing-attribution`, {
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${crmApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: 'form',
        form_type: input.formType,
        lead_cluster: input.leadCluster,
        ...Object.fromEntries(Object.entries(input.attribution).filter(([, value]) => typeof value === 'string')),
        payload: input.attribution,
      }),
    })
    const attributionResult = attributionResponse.ok
      ? await attributionResponse.json() as { public_id?: string }
      : null

    if (!attributionResponse.ok) {
      console.error(`[${input.formType}] CRM recusou o touch de atribuição (${attributionResponse.status})`)
    }

    const response = await fetch(`${baseUrl}/api/opportunities/sdr-sync`, {
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${crmApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: input.name,
        whatsapp: input.whatsapp,
        document: input.document,
        company_name: input.companyName,
        category: input.category,
        source: 'Site B&B',
        source_reference: input.sourceReference,
        demand: input.demand,
        pipeline_slug: input.pipelineSlug,
        status: 'novo',
        marketing_attribution_id: attributionResult?.public_id,
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      console.error(`[${input.formType}] CRM recusou a oportunidade (${response.status}): ${details}`)
      return false
    }

    return true
  } catch (error) {
    console.error(`[${input.formType}] Erro de conexão ao sincronizar lead com o CRM:`, error)
    return false
  }
}
