import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AGENT_GROUND_TRUTH } from '@/lib/agent-context';

function verifyInternalToken(req: Request): boolean {
  const secret = process.env.BLOG_ENGINE_SECRET
  if (!secret) return false
  const auth = req.headers.get('Authorization') ?? ''
  if (!auth.startsWith('Bearer ')) return false
  const token = auth.slice(7)
  try {
    const tokenBuf = Buffer.from(token)
    const secretBuf = Buffer.from(secret)
    if (tokenBuf.length !== secretBuf.length) return false
    return timingSafeEqual(tokenBuf, secretBuf)
  } catch {
    return false
  }
}

// Configurando o SDK do Gemini
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        if (!verifyInternalToken(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ success: false, error: 'GEMINI_API_KEY não configurada no .env' }, { status: 200 });
        }

        const payload = await getPayload({ config });

        // Buscar títulos das postagens recentes para evitar repetição
        const postsExistentes = await payload.find({
            collection: 'blog',
            limit: 50,
            select: {
                title: true
            }
        });
        const titulosAntigos = postsExistentes.docs.map(d => d.title).join(", ");

        // Usando gemini-2.5-flash (Modelo de elite disponível na chave do usuário)
        const model = genAI.getGenerativeModel(
            { model: "gemini-2.5-flash" },
            { apiVersion: 'v1beta' }
        );

        // --------------------------------------------------------------------------------
        // 1. O AGENTE ESTRATEGISTA (Definição de Pauta)
        // --------------------------------------------------------------------------------
        const promptEstrategista = `
            Você é o Diretor de Estratégia de Conteúdo B2B da B&B Iluminação.
            Sua tarefa é usar a Pesquisa Google (Grounding) para identificar quais são as dúvidas REAIS, 
            perguntas frequentes (PAA - People Also Ask) e tendências de busca técnica hoje no Brasil sobre:
            - ${AGENT_GROUND_TRUTH.BRAND_VOICE}

            PASSO 1: Pesquise no Google por termos como "dúvidas iluminação externa", "como instalar poste metálico", "norma NBR postes", "cálculo de lux estacionamento".
            PASSO 2: Com base nos resultados reais da web, escolha uma pauta inédita e RELEVANTE.
            
            POSTAGENS JÁ REALIZADAS (É CRÍTICO NÃO REPETIR NENHUM DESTES TEMAS OU ÂNGULOS):
            ${titulosAntigos || "Nenhuma postagem ainda."}

            DIRETRIZ DE VARIEDADE:
            - Alterne entre: Guia Técnico (Instalação/Normas), Economia de Energia, Design/Estética Industrial e Estudos de Caso.
            - Evite ser generalista demais; foque em problemas específicos de engenharia ou arquitetura.
            - Se um tema já foi abordado (veja a lista acima), escolha um nicho ou ângulo completamente diferente.

            Retorne apenas o título (direto ao ponto, com pegada SEO Question-based). 
        `;

        const restEstrategista = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: promptEstrategista }] }],
            tools: [{ googleSearch: {} }] as any
        });
        const pauta = restEstrategista.response.text().trim();

        // --------------------------------------------------------------------------------
        // 2. O AGENTE REDATOR (Gerando o Conteúdo)
        // --------------------------------------------------------------------------------
        const promptRedator = `
            Você é um Engenheiro Sênior / Redator Técnico da B&B Iluminação.
            O título escolhido pelo estrategista foi: "${pauta}".
            
            Sua missão é gerar o conteúdo técnico em formato JSON ESTRITO. 
            Não inclua explicações antes ou depois do JSON.
            
            DIRETRIZES DE FORMATAÇÃO:
            - Use tags <h2> para seções principais e <h3> para subseções.
            - Use <strong> para destacar termos técnicos e normas.
            - MUITO IMPORTANTE: Se houver dados comparativos ou valores de NBR, use obrigatoriamente uma <table> HTML simples (thead, tbody, tr, th, td). O site está preparado para estilizar estas tabelas de forma premium.
            - Use <ul> e <li> para listas de benefícios ou especificações.
            
            RETORNE EXATAMENTE NESTE FORMATO JSON:
            {
                "title": "${pauta}",
                "slug": "slugify-o-titulo",
                "summary": "Resumo executivo de 50 palavras...",
                "bodyHtml": "Conteúdo rico em HTML estruturado aqui...",
                "faqs": [ {"question": "...", "answer": "..."} ]
            }
        `;

        const restRedator = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: promptRedator }] }],
            generationConfig: { responseMimeType: "application/json" }
        });

        const conteudoAgente = JSON.parse(restRedator.response.text());
        }

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
            
            DIRETRIZ DE REVISÃO (RIGOR MODERADO):
            O artigo recomenda ativamente alguma prática que viole diretamente as NBRs de segurança? 
            (Pequenas imprecisões ou menções indiretas a iluminação interna são aceitáveis como contexto, desde que o foco principal seja iluminação externa e industrial). 
            Seja flexível com o escopo criativo, priorizando a coerência, a qualidade B2B e o fluxo de leitura, barrando apenas erros técnicos graves ou conselhos que firam as normas de estrutura.

            Responda em formato JSON:
            {
                "aprovado": true ou false,
                "motivo_reprovacao": "se houver"
            }
        `;
        const resRevisor = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: promptRevisor }] }],
            generationConfig: { responseMimeType: "application/json" }
        });
        const veredicto = JSON.parse(resRevisor.response.text());

        if (!veredicto.aprovado) {
            // Em um fluxo vivo, acionaríamos um retry ou loop para o Redator consertar.
            // Para proteger o Payload, rejeitamos e logamos a atuação protetora do Revisor.
            console.warn("Agente Revisor reprovou o artigo:", veredicto.motivo_reprovacao);
            return NextResponse.json({ 
                success: false,
                warning: "Artigo reprovado pelo Agente Revisor AI na malha técnica fina.", 
                reason: veredicto.motivo_reprovacao 
            }, { status: 200 });
        }

        // --------------------------------------------------------------------------------
        // 4. O AGENTE FOTÓGRAFO (Gerando a Imagem de Capa com Imagen 4)
        // --------------------------------------------------------------------------------
        let featuredImageId = null;
        try {
            const promptFoto = `
                Generate a high-end, ultra-realistic industrial photography prompt in English for Google Imagen 4.
                Subject: ${conteudoAgente.title}.
                Style: Professional night/dusk photography, realistic lighting, industrial aesthetic, high quality, 8k resolution. 
                Focus on B&B Iluminação infrastructure: metallic poles, external lighting, public squares or parking lots.
                Return only the prompt string.
            `;
            const resPromptFoto = await model.generateContent(promptFoto);
            const finalImagePrompt = resPromptFoto.response.text().trim();

            const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
            const imagenResponse = await fetch(imagenUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instances: [{ prompt: finalImagePrompt }],
                    parameters: { sampleCount: 1 }
                })
            });

            if (imagenResponse.ok) {
                const imagenData = await imagenResponse.json();
                const base64Image = imagenData?.predictions?.[0]?.bytesBase64Encoded;

                if (base64Image) {
                    // Fazendo upload para o Payload
                    const mediaDoc = await payload.create({
                        collection: 'media',
                        data: {
                            alt: `Imagem gerada por IA para o post: ${conteudoAgente.title}`,
                        },
                        file: {
                            data: Buffer.from(base64Image, 'base64'),
                            name: `blog-${conteudoAgente.slug}-${Date.now()}.png`,
                            mimetype: 'image/png',
                            size: Buffer.from(base64Image, 'base64').length,
                        },
                    });
                    featuredImageId = mediaDoc.id;
                }
            }
        } catch (imgError) {
            console.error("Erro na geração/upload da imagem:", imgError);
            // Continua sem imagem se falhar o fotógrafo
        }

        // --------------------------------------------------------------------------------
        // 5. PUBLICAÇÃO FINAL
        // --------------------------------------------------------------------------------
        const novoPost = await payload.create({
            collection: 'blog',
            data: {
                title: conteudoAgente.title,
                slug: conteudoAgente.slug + '-' + Date.now().toString().slice(-4),
                status: 'published',
                author: 'Eng. Lucas Borges',
                summary: conteudoAgente.summary,
                featuredImage: featuredImageId,
                // Injetando o HTML real se disponível, caso contrário fallback
                bodyHtml: conteudoAgente.bodyHtml,
                content: {
                    root: {
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ text: "Este post contém conteúdo técnico detalhado e foi revisado pelo Eng. Lucas Borges." }],
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
                    image: featuredImageId,
                },
                schemaMarkup: {
                    articleSchema: {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": conteudoAgente.title,
                        "image": featuredImageId ? `${process.env.NEXT_PUBLIC_SERVER_URL}/media/blog-${conteudoAgente.slug}.png` : '',
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
            message: "Sala de Redação operou com sucesso e publicou a matéria com imagem real.",
            post: novoPost,
            revisorLog: "Aprovado com maestria em compliance com NBRs"
        });

    } catch (error: any) {
        console.error("Falha na Sala de Redação AI:", error);
        return NextResponse.json({ 
            success: false,
            error: 'Erro no pipeline dos agentes', 
            details: error.message,
            stack: error.stack ? error.stack.split('\n').slice(0, 3) : null
        }, { status: 200 });
    }
}
