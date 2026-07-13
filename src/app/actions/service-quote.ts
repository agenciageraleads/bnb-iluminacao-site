"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

function renderAttribution(formData: FormData) {
  const rows = attributionFields
    .map((field) => {
      const value = formData.get(field)
      return value ? `<p><strong>${field}:</strong> ${String(value)}</p>` : ''
    })
    .join('')

  return rows ? `<hr /><h3>Atribuição</h3>${rows}` : ''
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

  // Processar arquivo anexo
  const attachments: { filename: string; content: Buffer }[] = []
  if (arquivoRaw instanceof File && arquivoRaw.size > 0) {
    const buffer = Buffer.from(await arquivoRaw.arrayBuffer())
    attachments.push({ filename: arquivoRaw.name, content: buffer })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Site B&B Iluminação <onboarding@resend.dev>',
      to: ['contato@bebiluminacao.com'],
      subject: `[PINTURA] Nova Cotação B2B — ${empresa}`,
      attachments,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 40px; color: #111827;">
          <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #facc15; padding-bottom: 10px; margin-bottom: 30px;">
            Cotação — Pintura Eletrostática
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; width: 160px;">Empresa:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${empresa}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Responsável:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${nome}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">WhatsApp:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${telefone}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Volume Estimado:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${volume}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Tipo de Material:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${material || 'Não informado'}</td></tr>
            ${cidade ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Cidade:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${cidade}</td></tr>` : ''}
            ${attachments.length > 0 ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Anexo:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${attachments[0].filename}</td></tr>` : ''}
          </table>
          ${mensagem ? `<div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #facc15;"><p style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin-top: 0; margin-bottom: 8px;">Observações:</p><p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${mensagem}</p></div>` : ''}
          ${renderAttribution(formData)}
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">Enviado pelo formulário de cotação de pintura eletrostática — B&B Iluminação</p>
        </div>
      `,
    })

    if (error) return { success: false, error: "Falha ao enviar. Tente novamente mais tarde." }
    return { success: true, message: "Cotação enviada! Entraremos em contato em breve." }
  } catch {
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

  // Processar arquivo técnico anexo
  const attachments: { filename: string; content: Buffer }[] = []
  if (arquivoRaw instanceof File && arquivoRaw.size > 0) {
    const buffer = Buffer.from(await arquivoRaw.arrayBuffer())
    attachments.push({ filename: arquivoRaw.name, content: buffer })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Site B&B Iluminação <onboarding@resend.dev>',
      to: ['contato@bebiluminacao.com'],
      subject: `[LASER] Nova Cotação B2B — ${empresa}`,
      attachments,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 40px; color: #111827;">
          <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #facc15; padding-bottom: 10px; margin-bottom: 30px;">
            Cotação — Corte a Laser
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; width: 160px;">Empresa:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${empresa}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Responsável:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${nome}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">WhatsApp:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${telefone}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Material:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${materialLaser || 'Não informado'}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Espessura:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${espessura || 'Não informado'}</td></tr>
            <tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Quantidade/Lote:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${quantidade || 'Não informado'}</td></tr>
            ${cidade ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Cidade:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${cidade}</td></tr>` : ''}
            ${attachments.length > 0 ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Arquivo Técnico:</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${attachments[0].filename}</td></tr>` : ''}
          </table>
          ${mensagem ? `<div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #facc15;"><p style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin-top: 0; margin-bottom: 8px;">Descrição da Peça:</p><p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${mensagem}</p></div>` : ''}
          ${renderAttribution(formData)}
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">Enviado pelo formulário de cotação de corte a laser — B&B Iluminação</p>
        </div>
      `,
    })

    if (error) return { success: false, error: "Falha ao enviar. Tente novamente mais tarde." }
    return { success: true, message: "Cotação enviada! Entraremos em contato em breve." }
  } catch {
    return { success: false, error: "Erro interno no servidor." }
  }
}
