'use server'

import { getPayload } from 'payload'
import config from '../../../payload.config'
import { Resend } from 'resend'

export type LeadState = {
    status: 'idle' | 'loading' | 'success' | 'error'
    message?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function createCatalogLead(prevState: any, formData: FormData) {
    const payload = await getPayload({ config })

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const company = formData.get('company') as string
    const companyCnpj = formData.get('companyCnpj') as string
    const catalogId = formData.get('catalogId') as string

    if (!name || !email || !phone || !company || !companyCnpj) {
        return { status: 'error', message: 'Todos os campos são obrigatórios.' }
    }

    try {
        await payload.create({
            collection: 'catalog-leads' as any,
            data: {
                name,
                email,
                phone,
                company,
                companyCnpj,
                catalogDownloaded: catalogId,
            },
        })

        // Disparo via Resend (Alternativa ao N8N)
        try {
            await resend.emails.send({
                from: 'Leads B&B <leads@bebiluminacao.com.br>',
                to: ['contato@bebiluminacao.com.br'], // Substitua pelo e-mail do comercial
                subject: `Novo Lead B2B: Catálogo ${catalogId}`,
                html: `
                    <h2>Novo Lead Interessado em Catálogo</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Telefone/WhatsApp:</strong> ${phone}</p>
                    <p><strong>Empresa:</strong> ${company}</p>
                    <p><strong>CNPJ:</strong> ${companyCnpj}</p>
                    <p><strong>Catálogo Baixado:</strong> ${catalogId}</p>
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
