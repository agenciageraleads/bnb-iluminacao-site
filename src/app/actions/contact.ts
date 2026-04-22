"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const nome = formData.get('nome') as string;
  const email = formData.get('email') as string;
  const telefone = formData.get('telefone') as string;
  const assunto = formData.get('assunto') as string;
  const mensagem = formData.get('mensagem') as string;

  if (!nome || !email || !assunto || !mensagem) {
    return { success: false, error: "Por favor, preencha todos os campos obrigatórios." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Site B&B Iluminação <onboarding@resend.dev>', // No futuro usar dominio verificado @bebiluminacao.com
      to: ['contato@bebiluminacao.com'],
      subject: `[SITE B&B] Novo Contato: ${assunto}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 40px; color: #111827;">
          <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #111827; padding-bottom: 10px; margin-bottom: 30px;">
            Novo Contato Recebido
          </h1>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 10px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; width: 140px;">Nome:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: bold;">${nome}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">E-mail:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: bold;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Telefone:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: bold;">${telefone || 'Não informado'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Assunto:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: bold;">${assunto}</td>
            </tr>
          </table>
          
          <div style="background-color: #f9fafb; padding: 30px; border-left: 4px solid #facc15;">
            <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin-top: 0; margin-bottom: 10px;">Mensagem:</p>
            <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${mensagem}</p>
          </div>
          
          <p style="margin-top: 40px; font-size: 12px; color: #9ca3af; text-align: center;">
            Este e-mail foi enviado automaticamente pelo formulário de contato do site B&B Iluminação.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Erro no Resend:", error);
      return { success: false, error: "Falha ao enviar e-mail. Tente novamente mais tarde." };
    }

    return { success: true, message: "Mensagem enviada com sucesso!" };
  } catch (err) {
    console.error("Erro inesperado:", err);
    return { success: false, error: "Erro interno no servidor." };
  }
}
