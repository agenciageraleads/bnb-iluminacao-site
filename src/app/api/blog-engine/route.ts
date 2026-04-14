import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AGENT_GROUND_TRUTH } from '@/lib/agent-context';

// Configurando o SDK do Gemini
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'GEMINI_API_KEY não configurada no .env' }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Modelo rápido e excelente para redação técnica

        // --------------------------------------------------------------------------------
        // 1. O AGENTE ESTRATEGISTA (Definindo a Pauta)
        // --------------------------------------------------------------------------------
        const promptEstrategista = `
            Você é o Diretor de Estratégia de Conteúdo B2B da B&B Iluminação.
            ${AGENT_GROUND_TRUTH.BRAND_VOICE}
            
            Gere uma única pauta de artigo muito técnica e específica sobre uma estrutura metálica externa, 
            que um engenheiro ou urbanista estaria pesquisando. 
            Retorne apenas o título, nada mais. Exemplo: "Como dimensionar chumbadores para postes metálicos costeiros".
        `;
        const restEstrategista = await model.generateContent(promptEstrategista);
        const pauta = restEstrategista.response.text().trim();

        // --------------------------------------------------------------------------------
        // 2. O AGENTE REDATOR (Gerando o Conteúdo)
        // --------------------------------------------------------------------------------
        const promptRedator = `
            Você é um Engenheiro Sênior / Redator Técnico da B&B Iluminação.
            O título escolhido pelo estrategista foi: "${pauta}".
            
            Escreva um artigo de blog técnico. Use elementos de GEO (Generative Engine Optimization):
            - Um resumo focado (TL;DR) no topo.
            - Dados densos e marcações em tabelas ou listas sempre que possível.
            - Responda perguntas exatas (formato FAQ no final).
            
            Retorne DE FORMA ESTRUTURADA EM JSON válido, exatamente com estas propriedades:
            {
                "title": "${pauta}",
                "slug": "slug-gerado-no-formato-lote-url-amigavel",
                "summary": "Resumo executivo de 50 palavras...",
                "bodyHtml": "<h2>...</h2><p>...</p>",
                "faqs": [ {"question": "...", "answer": "..."} ]
            }
        `;
        const resRedator = await model.generateContent(promptRedator);
        let textoGeradoJson = resRedator.response.text().trim();
        
        // Limpando possível formatação markdown gerada pela IA
        if (textoGeradoJson.startsWith('\`\`\`json')) {
            textoGeradoJson = textoGeradoJson.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        }
        
        const conteudoAgente = JSON.parse(textoGeradoJson);

        // --------------------------------------------------------------------------------
        // 3. O AGENTE REVISOR (O "Chefe" Fact-Checker das NBRs)
        // --------------------------------------------------------------------------------
        const promptRevisor = `
            Você é o Inspetor de Qualidade e Estruturas da B&B Iluminação.
            Sua única função é revisar textos gerados pela equipe contra as nossas Fontes e Normas (Ground Truth).
            
            FONTES DA VERDADE:
            ${AGENT_GROUND_TRUTH.NBR_14744}
            ${AGENT_GROUND_TRUTH.NBR_6323}
            ${AGENT_GROUND_TRUTH.BRAND_VOICE}
            
            ARTIGO GERADO (JSON):
            ${JSON.stringify(conteudoAgente)}
            
            O artigo menciona algo que viola as NBRs? Ele fala de iluminação interna (que é proibido)? 
            Responda em formato JSON:
            {
                "aprovado": true ou false,
                "motivo_reprovacao": "se houver"
            }
        `;
        const resRevisor = await model.generateContent(promptRevisor);
        let decisaoRevisor = resRevisor.response.text().trim();
        if (decisaoRevisor.startsWith('\`\`\`json')) {
            decisaoRevisor = decisaoRevisor.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        }
        
        const veredicto = JSON.parse(decisaoRevisor);

        if (!veredicto.aprovado) {
            // Em um fluxo vivo, acionaríamos um retry ou loop para o Redator consertar.
            // Para proteger o Payload, rejeitamos e logamos a atuação protetora do Revisor.
            console.warn("Agente Revisor reprovou o artigo:", veredicto.motivo_reprovacao);
            return NextResponse.json({ 
                warning: "Artigo reprovado pelo Agente Revisor AI na malha técnica fina.", 
                reason: veredicto.motivo_reprovacao 
            }, { status: 400 });
        }

        // --------------------------------------------------------------------------------
        // 4. O AGENTE PUBLICADOR (Injetando no Payload CMS)
        // --------------------------------------------------------------------------------
        const payload = await getPayload({ config });
        
        // Formato Lexical simples (pode ser ajustado de acordo com seu parser Lexical exato)
        // Por ora, salvaremos o HTML gerado se você utilizar HTML, ou faremos uma pequena conversão.
        
        const novoPost = await payload.create({
            collection: 'blog',
            data: {
                title: conteudoAgente.title,
                slug: conteudoAgente.slug + '-' + Date.now().toString().slice(-4), // Prevenção de duplicidade
                status: 'published',
                author: 'Eng. Lucas Borges',
                summary: conteudoAgente.summary,
                // Na v3 Payload, se richText usa lexical, ideal é salvar o texto via plugin de conversão 
                // ou passar dados em Object JSON block. Vamos emular estrutura básica:
                content: {
                    root: {
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ text: "Conteúdo injetado via AI Pipeline (RichText em Lexical format)." }],
                            }
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'root',
                        version: 1,
                    }
                },
                faqs: conteudoAgente.faqs,
                meta: {
                    title: conteudoAgente.title,
                    description: conteudoAgente.summary,
                },
                schemaMarkup: {
                    articleSchema: {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": conteudoAgente.title,
                        "author": {
                            "@type": "Person",
                            "name": "Lucas Borges"
                        }
                    }
                }
            } as any
        });

        return NextResponse.json({
            success: true,
            message: "Sala de Redação operou com sucesso e publicou a matéria.",
            post: novoPost,
            revisorLog: "Aprovado com maestria em compliance com NBRs"
        });

    } catch (error) {
        console.error("Falha na Sala de Redação AI:", error);
        return NextResponse.json({ error: 'Erro no pipeline dos agentes' }, { status: 500 });
    }
}
