'use server'

import { getPayload } from 'payload'
import config from '../../../payload.config'
import { Resend } from 'resend'

export type LeadState = {
    status: 'idle' | 'loading' | 'success' | 'error'
    message?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

const attributionFields = [
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
    'fbclid',
    'msclkid',
]

function readAttribution(formData: FormData) {
    return Object.fromEntries(
        attributionFields
            .map((field) => [field, formData.get(field)])
            .filter(([, value]) => Boolean(value)),
    )
}

function renderAttribution(attribution: Record<string, FormDataEntryValue>) {
    const rows = Object.entries(attribution)
        .map(([field, value]) => `<p><strong>${field}:</strong> ${value}</p>`)
        .join('')

    return rows ? `<hr /><h3>Atribuição</h3>${rows}` : ''
}

function digitsOnly(value: string) {
    return value.replace(/\D/g, '')
}

async function createCatalogOpportunity(input: {
    name: string
    email: string
    phone: string
    company: string
    companyCnpj: string
    catalogId: string
}) {
    const crmApiUrl = process.env.CRM_API_URL
    const crmApiKey = process.env.CRM_API_KEY

    if (!crmApiUrl || !crmApiKey) {
        throw new Error('Integração com o CRM não configurada')
    }

    const document = digitsOnly(input.companyCnpj)
    const whatsapp = digitsOnly(input.phone)
    const response = await fetch(`${crmApiUrl.replace(/\/$/, '')}/api/opportunities/sdr-sync`, {
        method: 'POST',
        signal: AbortSignal.timeout(10_000),
        headers: {
            Authorization: `Bearer ${crmApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: input.name,
            whatsapp,
            document,
            company_name: input.company,
            category: 'Lead Catálogo',
            source: 'Site B&B',
            source_reference: `site-catalogo:${document}:${input.catalogId}`,
            demand: `Download do catálogo ${input.catalogId} · E-mail: ${input.email}`,
            pipeline_slug: 'leads',
            status: 'novo',
        }),
    })

    if (!response.ok) {
        const details = await response.text()
        throw new Error(`CRM recusou a oportunidade (${response.status}): ${details}`)
    }
}

export async function createCatalogLead(prevState: any, formData: FormData) {
    const payload = await getPayload({ config })

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const company = formData.get('company') as string
    const companyCnpj = formData.get('companyCnpj') as string
    const catalogId = formData.get('catalogId') as string
    const attribution = readAttribution(formData)

    if (!name || !email || !phone || !company || !companyCnpj) {
        return { status: 'error', message: 'Todos os campos são obrigatórios.' }
    }

    try {
        await createCatalogOpportunity({
            name,
            email,
            phone,
            company,
            companyCnpj,
            catalogId,
        })

        await payload.create({
            collection: 'catalog-leads' as any,
            data: {
                name,
                email,
                phone,
                company,
                companyCnpj,
                catalogDownloaded: catalogId,
                attribution,
            },
        })

        // Disparo via Resend (Alternativa ao N8N)
        try {
            await resend.emails.send({
                from: 'Leads B&B <leads@bebiluminacao.com.br>',
                to: ['contato@bebiluminacao.com'],
                subject: `Novo Lead B2B: Catálogo ${catalogId}`,
                html: `
                    <h2>Novo Lead Interessado em Catálogo</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Telefone/WhatsApp:</strong> ${phone}</p>
                    <p><strong>Empresa:</strong> ${company}</p>
                    <p><strong>CNPJ:</strong> ${companyCnpj}</p>
                    <p><strong>Catálogo Baixado:</strong> ${catalogId}</p>
                    ${renderAttribution(attribution)}
                `
            })
        } catch (mailError) {
            console.error('Erro ao enviar email via Resend:', mailError)
            // Não falha a action se apenas o e-mail der erro, pois já salvou no banco
        }

        return { status: 'success', message: 'Dados registrados com sucesso!' }
    } catch (error) {
        console.error('Erro ao salvar lead:', error)
        return { status: 'error', message: 'Erro ao processar sua solicitação.' }
    }
}
