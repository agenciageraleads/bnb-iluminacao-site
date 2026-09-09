import { NextResponse } from 'next/server';

type CrmAssignment = {
  owner_id?: string;
  representative_id?: string;
};

const CRM_REPRESENTATIVE_ASSIGNMENTS: Record<string, CrmAssignment> = {
  "Bruno Pereira": { owner_id: "425caf44-5b7e-47bb-89a2-7c07f707ecd5" },
  "Bruno": { owner_id: "425caf44-5b7e-47bb-89a2-7c07f707ecd5" },
  "Juarez": { representative_id: "984a7b33-30cd-424a-b67f-168b52be8571" },
  "Alex Ferrari": { representative_id: "0720e174-8cb0-40d3-aa68-e9a7f6f4c118" },
  "José Gomes": { representative_id: "f222857a-0561-4468-9985-64c7e3c28526" },
  "Glauco": { representative_id: "5770d94c-bdb8-4206-bef1-548a5ff6e07e" },
  "João Santos": { representative_id: "67b49b83-2981-41af-95c9-9d0b8ef2ddd3" },
  "Wagner": { representative_id: "be65d9cf-9a51-440d-9d53-be6fb08467e4" },
  "Daniel": { representative_id: "5fbceab7-9aee-4588-a55c-c74fd36c2fbf" },
  "Mateus Henrique": { representative_id: "369bad03-cc3f-4bb9-9bdc-c747d6f4b3b1" },
  "Nickson": { representative_id: "ce84876f-67d4-498d-9550-701e10e6c57c" },
  "Luiz Alberto": { representative_id: "8d7ad977-3eca-4a59-b121-e33473b68a73" },
  "Júnior Martins": { representative_id: "f5f9a0bf-d8aa-4957-8c78-a477e7ead110" },
  "Junior Martins": { representative_id: "f5f9a0bf-d8aa-4957-8c78-a477e7ead110" },
};

function normalizeLookupKey(value: unknown) {
  return String(value || 'br')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function normalizeSourceSegment(value: unknown) {
  return normalizeLookupKey(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'br';
}

function digitsOnly(value: unknown) {
  return String(value || '').replace(/\D/g, '');
}

function resolveCrmAssignment(representativeName: unknown) {
  const target = normalizeLookupKey(representativeName);
  const assignmentKey = Object.keys(CRM_REPRESENTATIVE_ASSIGNMENTS).find(
    (name) => normalizeLookupKey(name) === target,
  );

  return assignmentKey ? CRM_REPRESENTATIVE_ASSIGNMENTS[assignmentKey] : {};
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validação básica
    if (!data.name || !data.phone || !data.representativeName) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const { name, phone, representativeName, representativeState, attribution } = data;

    // Conectar ao CRM B&B
    const crmApiUrl = process.env.CRM_API_URL || 'https://crm.bebiluminacao.com';
    const crmApiKey = process.env.CRM_API_KEY;

    if (crmApiKey) {
      const assignment = resolveCrmAssignment(representativeName);
      const stateSegment = normalizeSourceSegment(representativeState);
      const phoneDigits = digitsOnly(phone);
      const attributionResponse = attribution && typeof attribution === 'object'
        ? await fetch(`${crmApiUrl.replace(/\/$/, '')}/api/marketing-attribution`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${crmApiKey}` },
            body: JSON.stringify({
              channel: 'form',
              form_type: 'representative_contact',
              lead_cluster: 'representantes',
              ...attribution,
              payload: attribution,
            }),
          })
        : null;
      const attributionResult = attributionResponse?.ok
        ? await attributionResponse.json() as { public_id?: string }
        : null;

      const crmPayload = {
        name: name,
        whatsapp: phone,
        source: 'Site B&B',
        source_reference: `representantes-${stateSegment}:${phoneDigits || Date.now()}`,
        demand: `Contato para Representante: ${representativeName} (Região: ${representativeState || 'Não informada'})`,
        notes: attribution ? `Atribuição site: ${JSON.stringify(attribution)}` : undefined,
        pipeline_slug: 'leads',
        status: 'novo',
        marketing_attribution_id: attributionResult?.public_id,
        ...assignment,
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
          console.log(`[Lead Capture] Lead ${name} enviado com sucesso para o CRM. Representante: ${representativeName}`);
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
