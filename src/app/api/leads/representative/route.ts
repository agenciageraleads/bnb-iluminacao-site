import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const { name, phone, representativeState, representativeName } = body;

        if (!name || !phone) {
            return NextResponse.json({ error: "Nome e Telefone são obrigatórios." }, { status: 400 });
        }

        // Webhook URL (idealmente vem do .env, ex: process.env.N8N_WEBHOOK_URL_REPRESENTATIVES)
        // Se não houver, apenas logamos (útil para ambiente local/desenvolvimento)
        const webhookUrl = process.env.N8N_WEBHOOK_URL_REPRESENTATIVES;

        const payload = {
            lead: {
                name,
                phone,
            },
            context: {
                source: "Página de Representantes",
                representativeState,
                representativeName,
                timestamp: new Date().toISOString()
            }
        };

        if (webhookUrl) {
            // Disparar em background (não precisa aguardar o await completo caso seja demorado, 
            // mas com fetch podemos fazer um fire-and-forget simples, ou dar await com timeout)
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }).catch(e => console.error("Falha ao enviar webhook para o n8n:", e));
        } else {
            console.log("Mock Webhook Disparado! N8N_WEBHOOK_URL_REPRESENTATIVES não configurado.");
            console.log("Payload:", JSON.stringify(payload, null, 2));
        }

        return NextResponse.json({ success: true, message: "Lead capturado com sucesso." });
    } catch (error) {
        console.error("Erro na rota de captura de leads de representante:", error);
        return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
    }
}
