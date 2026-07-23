'use server'

import { getPayload } from 'payload'
import config from '../../../payload.config'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { claimSubmission, consumeRateLimit, escapeHtml, getTrustedClientIdentity, markSubmissionSuccessful, releaseSubmissionClaim } from '@/lib/public-form-security'

export type LeadState = {
    status: 'idle' | 'loading' | 'success' | 'error'
    message?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function createCatalogLead(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const company = formData.get('company') as string
    const companyCnpj = formData.get('companyCnpj') as string
    const catalogId = formData.get('catalogId') as string

    if (!name || !email || !phone || !company || !companyCnpj) {
        return { status: 'error', message: 'Todos os campos são obrigatórios.' }
    }

    if (formData.get('website')) return { status: 'success', message: 'Dados registrados com sucesso!' }
    const requestHeaders = await headers()
    const client = getTrustedClientIdentity(requestHeaders)
    if (!await consumeRateLimit(`catalog:${client}`, 5)) return { status: 'error', code: 429, message: 'Muitas tentativas. Aguarde alguns minutos.' }
    const submission = ['catalog', client, email, phone, catalogId]
    const claimToken = await claimSubmission(submission)
    if (!claimToken) return { status: 'success', message: 'Dados já registrados com sucesso!' }

    const payload = await getPayload({ config })

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
        try { await markSubmissionSuccessful(submission, claimToken) }
        catch (dedupeError) { console.error('Erro ao registrar deduplicação do lead:', dedupeError) }

        // Disparo via Resend (Alternativa ao N8N)
        try {
            await resend.emails.send({
                from: 'Leads B&B <leads@bebiluminacao.com.br>',
                to: ['contato@bebiluminacao.com'],
                subject: `Novo Lead B2B: Catálogo ${catalogId}`,
                html: `
                    <h2>Novo Lead Interessado em Catálogo</h2>
                    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
                    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Telefone/WhatsApp:</strong> ${escapeHtml(phone)}</p>
                    <p><strong>Empresa:</strong> ${escapeHtml(company)}</p>
                    <p><strong>CNPJ:</strong> ${escapeHtml(companyCnpj)}</p>
                    <p><strong>Catálogo Baixado:</strong> ${escapeHtml(catalogId)}</p>
                `
            })
        } catch (mailError) {
            console.error('Erro ao enviar email via Resend:', mailError)
            // Não falha a action se apenas o e-mail der erro, pois já salvou no banco
        }

        return { status: 'success', message: 'Dados registrados com sucesso!' }
    } catch (error) {
        await releaseSubmissionClaim(submission, claimToken)
        console.error('Erro ao salvar lead:', error)
        return { status: 'error', message: 'Erro ao processar sua solicitação.' }
    }
}
