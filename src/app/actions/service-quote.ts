"use server"

import { Resend } from 'resend';
import { headers } from 'next/headers'
import { claimSubmission, consumeRateLimit, escapeHtml, getTrustedClientIdentity, hasValidMagicBytes, markSubmissionSuccessful, releaseSubmissionClaim, validateUploadMetadata } from '@/lib/public-form-security'

const resend = new Resend(process.env.RESEND_API_KEY);
const PAINT_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf']
const LASER_EXTENSIONS = [...PAINT_EXTENSIONS, '.dxf', '.dwg']

async function guardSubmission(formData: FormData, kind: string, values: string[]) {
  if (formData.get('website')) return { success: true, message: 'Cotação enviada! Entraremos em contato em breve.' }
  const requestHeaders = await headers()
  const client = getTrustedClientIdentity(requestHeaders)
  if (!await consumeRateLimit(`${kind}:${client}`)) return { result: { success: false, status: 429, error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' } }
  const submission = [kind, client, ...values]
  const claimToken = await claimSubmission(submission)
  if (!claimToken) return { result: { success: true, message: 'Cotação já recebida. Entraremos em contato em breve.' } }
  return { submission, claimToken }
}

async function prepareAttachment(file: FormDataEntryValue | null, allowedExtensions: string[]) {
  if (!(file instanceof File) || file.size === 0) return { attachments: [] as { filename: string; content: Buffer }[] }
  const metadata = validateUploadMetadata(file, allowedExtensions)
  if (!metadata.ok) return metadata
  const buffer = Buffer.from(await file.arrayBuffer())
  if (!hasValidMagicBytes(buffer.subarray(0, 64), metadata.extension)) return { ok: false as const, status: 415, error: 'O conteúdo do arquivo não corresponde ao formato informado.' }
  return { attachments: [{ filename: file.name.replace(/[^a-zA-Z0-9._-]/g, '_'), content: buffer }] }
}

async function recordSuccessfulSubmission(submission: string[], claimToken: string) {
  try { await markSubmissionSuccessful(submission, claimToken) }
  catch (error) { console.error('Failed to record public form dedupe marker', error) }
}

export interface ServiceQuoteFormData {
  empresa: string
  nome: string
  telefone: string
  mensagem?: string
  cidade?: string
  // pintura
  volume?: string
  material?: string
  // laser
  materialLaser?: string
  espessura?: string
  quantidade?: string
}

export async function sendPinturaQuote(formData: FormData) {
  const empresa = formData.get('empresa') as string
  const nome = formData.get('nome') as string
  const telefone = formData.get('telefone') as string
  const volume = formData.get('volume') as string
  const material = formData.get('material') as string
  const mensagem = formData.get('mensagem') as string
  const cidade = formData.get('cidade') as string
  const arquivoRaw = formData.get('arquivo')

  if (!empresa || !nome || !telefone || !volume) {
    return { success: false, error: "Preencha os campos obrigatórios: Empresa, Nome, Telefone e Volume." }
  }

  const guard = await guardSubmission(formData, 'pintura', [empresa, nome, telefone, volume, mensagem])
  if (guard.result) return guard.result

  // Processar arquivo anexo
  const prepared = await prepareAttachment(arquivoRaw, PAINT_EXTENSIONS)
  if ('error' in prepared) { await releaseSubmissionClaim(guard.submission!, guard.claimToken!); return { success: false, status: prepared.status, error: prepared.error } }
  const attachments = prepared.attachments

  try {
    const { error } = await resend.emails.send({
      from: 'Site B&B Iluminação <onboarding@resend.dev>',
      to: ['contato@bebiluminacao.com'],
      subject: `[PINTURA] Nova Cotação B2B — ${empresa.replace(/[\r\n]/g, ' ')}`,
      attachments,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 40px; color: #111827;">
          <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #facc15; padding-bottom: 10px; margin-bottom: 30px;">
            Cotação — Pintura Eletrostática
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; width: 160px;">Empresa:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(empresa)}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Responsável:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(nome)}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">WhatsApp:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(telefone)}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Volume Estimado:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(volume)}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Tipo de Material:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(material || 'Não informado')}</td></tr>
            ${cidade ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Cidade:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(cidade)}</td></tr>` : ''}
            ${attachments.length > 0 ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Anexo:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(attachments[0].filename)}</td></tr>` : ''}
          </table>
          ${mensagem ? `<div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #facc15;"><p style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin-top: 0; margin-bottom: 8px;">Observações:</p><p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(mensagem)}</p></div>` : ''}
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">Enviado pelo formulário de cotação de pintura eletrostática — B&B Iluminação</p>
        </div>
      `,
    })

    if (error) { await releaseSubmissionClaim(guard.submission!, guard.claimToken!); return { success: false, error: "Falha ao enviar. Tente novamente mais tarde." } }
    await recordSuccessfulSubmission(guard.submission!, guard.claimToken!)
    return { success: true, message: "Cotação enviada! Entraremos em contato em breve." }
  } catch {
    await releaseSubmissionClaim(guard.submission!, guard.claimToken!)
    return { success: false, error: "Erro interno no servidor." }
  }
}

export async function sendLaserQuote(formData: FormData) {
  const empresa = formData.get('empresa') as string
  const nome = formData.get('nome') as string
  const telefone = formData.get('telefone') as string
  const materialLaser = formData.get('materialLaser') as string
  const espessura = formData.get('espessura') as string
  const quantidade = formData.get('quantidade') as string
  const mensagem = formData.get('mensagem') as string
  const cidade = formData.get('cidade') as string
  const arquivoRaw = formData.get('arquivo')

  if (!empresa || !nome || !telefone) {
    return { success: false, error: "Preencha os campos obrigatórios: Empresa, Nome e Telefone." }
  }

  const guard = await guardSubmission(formData, 'laser', [empresa, nome, telefone, materialLaser, quantidade, mensagem])
  if (guard.result) return guard.result

  // Processar arquivo técnico anexo
  const prepared = await prepareAttachment(arquivoRaw, LASER_EXTENSIONS)
  if ('error' in prepared) { await releaseSubmissionClaim(guard.submission!, guard.claimToken!); return { success: false, status: prepared.status, error: prepared.error } }
  const attachments = prepared.attachments

  try {
    const { error } = await resend.emails.send({
      from: 'Site B&B Iluminação <onboarding@resend.dev>',
      to: ['contato@bebiluminacao.com'],
      subject: `[LASER] Nova Cotação B2B — ${empresa.replace(/[\r\n]/g, ' ')}`,
      attachments,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 40px; color: #111827;">
          <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #facc15; padding-bottom: 10px; margin-bottom: 30px;">
            Cotação — Corte a Laser
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; width: 160px;">Empresa:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(empresa)}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Responsável:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(nome)}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">WhatsApp:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(telefone)}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Material:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(materialLaser || 'Não informado')}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Espessura:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(espessura || 'Não informado')}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Quantidade/Lote:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(quantidade || 'Não informado')}</td></tr>
            ${cidade ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Cidade:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(cidade)}</td></tr>` : ''}
            ${attachments.length > 0 ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Arquivo Técnico:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(attachments[0].filename)}</td></tr>` : ''}
          </table>
          ${mensagem ? `<div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #facc15;"><p style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin-top: 0; margin-bottom: 8px;">Descrição da Peça:</p><p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(mensagem)}</p></div>` : ''}
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">Enviado pelo formulário de cotação de corte a laser — B&B Iluminação</p>
        </div>
      `,
    })

    if (error) { await releaseSubmissionClaim(guard.submission!, guard.claimToken!); return { success: false, error: "Falha ao enviar. Tente novamente mais tarde." } }
    await recordSuccessfulSubmission(guard.submission!, guard.claimToken!)
    return { success: true, message: "Cotação enviada! Entraremos em contato em breve." }
  } catch {
    await releaseSubmissionClaim(guard.submission!, guard.claimToken!)
    return { success: false, error: "Erro interno no servidor." }
  }
}
