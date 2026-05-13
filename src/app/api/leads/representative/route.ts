import { NextResponse } from 'next/server';

// Mapeamento de nome de representante (no Payload CMS) para o ID (UUID) no CRM
const CRM_REPRESENTATIVE_MAP: Record<string, string> = {
  "Lucas Borges": "502d8788-3335-49c7-8069-7b056e5bd54a",
  "Juarez": "984a7b33-30cd-424a-b67f-168b52be8571",
  "Alex Ferrari": "0720e174-8cb0-40d3-aa68-e9a7f6f4c118",
  "José Gomes": "f222857a-0561-4468-9985-64c7e3c28526",
  "Glauco": "5770d94c-bdb8-4206-bef1-548a5ff6e07e",
  "João Santos": "67b49b83-2981-41af-95c9-9d0b8ef2ddd3",
  "Wagner": "be65d9cf-9a51-440d-9d53-be6fb08467e4",
  "Daniel": "5fbceab7-9aee-4588-a55c-c74fd36c2fbf",
  "Mateus Henrique": "369bad03-cc3f-4bb9-9bdc-c747d6f4b3b1",
  "Fernanda Rainy": "3cdedb4e-a25d-4ade-b6d5-da42c727acc3",
  "Nickson": "ce84876f-67d4-498d-9550-701e10e6c57c",
  "Luiz Alberto": "8d7ad977-3eca-4a59-b121-e33473b68a73"
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validação básica
    if (!data.name || !data.phone || !data.representativeName) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const { name, phone, representativeName, representativeState } = data;

    // Conectar ao CRM B&B
    const crmApiUrl = process.env.CRM_API_URL || 'https://crm.bebiluminacao.com';
    const crmApiKey = process.env.CRM_API_KEY;

    if (crmApiKey) {
      // Procurar o UUID do representante no mapa
      const ownerId = CRM_REPRESENTATIVE_MAP[representativeName];

      const crmPayload = {
        name: name,
        whatsapp: phone,
        source: 'Site B&B',
        source_reference: `representantes-${representativeState?.toLowerCase() || 'br'}`,
        demand: `Contato para Representante: ${representativeName} (Região: ${representativeState || 'Não informada'})`,
        pipeline_slug: 'leads',
        status: 'novo',
        ...(ownerId ? { owner_id: ownerId } : {}) // Atribui ao representante caso encontrado
      };

      try {
        const response = await fetch(`${crmApiUrl}/api/opportunities/sdr-sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${crmApiKey}`
          },
          body: JSON.stringify(crmPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erro na API do CRM:", response.status, errorText);
        } else {
          console.log(`[Lead Capture] Lead ${name} enviado com sucesso para o CRM. Owner: ${representativeName}`);
        }
      } catch (crmError) {
        console.error("Erro de conexão ao enviar para o CRM:", crmError);
      }
    } else {
      console.log("[Lead Capture - MOCK] Lead recebido (CRM_API_KEY não configurada):", {
        name, phone, representativeName, representativeState
      });
    }

    // Sempre retorna sucesso pro Frontend para liberar o acesso ao lead
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erro ao processar captura de lead:", error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
