import puppeteer from 'puppeteer';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';

// Captura a URL dos argumentos ou usa a da VenturaTC como padrão
const targetUrl = process.argv[2] || 'https://venturatc.com.br';

console.log(`\n======================================================`);
console.log(`🔍 INICIANDO AUDITORIA TÉCNICA DE SEO`);
console.log(` Target: ${targetUrl}`);
console.log(`======================================================\n`);

async function runAudit() {
    let browser;
    try {
        const parsedUrl = new URL(targetUrl);
        const hostname = parsedUrl.hostname.replace(/www\./, '');

        // Launch Puppeteer headless
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Rastrear peso das imagens interceptando requisições
        const imageSizes = {};
        const imageContentTypes = {};

        await page.setRequestInterception(true);
        page.on('request', request => {
            request.continue();
        });

        page.on('response', async response => {
            const url = response.url();
            const resourceType = response.request().resourceType();
            
            if (resourceType === 'image') {
                const headers = response.headers();
                const contentLength = headers['content-length'];
                const contentType = headers['content-type'] || '';
                
                if (contentLength) {
                    imageSizes[url] = parseInt(contentLength, 10);
                }
                if (contentType) {
                    imageContentTypes[url] = contentType;
                }
            }
        });

        // Configura viewport padrão e User-Agent simulando desktop real
        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (Googlebot/2.1)');

        console.log(`⏳ Acessando a página e renderizando conteúdo...`);
        const response = await page.goto(targetUrl, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        const httpStatus = response.status();
        console.log(`📥 Resposta HTTP: ${httpStatus}`);

        if (httpStatus >= 400) {
            throw new Error(`O site retornou um erro HTTP ${httpStatus}`);
        }

        console.log(`🧠 Analisando estrutura da página (DOM)...`);

        // Extrai metadados, headings, imagens e links do contexto da página
        const auditData = await page.evaluate((targetUrl) => {
            // Helper para obter conteúdo de meta tag
            const getMeta = (nameOrProperty) => {
                const el = document.querySelector(`meta[name="${nameOrProperty}"], meta[property="${nameOrProperty}"]`);
                return el ? el.getAttribute('content') : null;
            };

            // 1. Metadados e Meta Tags
            const title = document.title;
            const description = getMeta('description');
            const canonicalEl = document.querySelector('link[rel="canonical"]');
            const canonical = canonicalEl ? canonicalEl.getAttribute('href') : null;

            // Open Graph e Twitter
            const ogTitle = getMeta('og:title');
            const ogDesc = getMeta('og:description');
            const ogUrl = getMeta('og:url');
            const ogImage = getMeta('og:image');

            // 2. Headings (Estrutura e Ordem)
            const headings = [];
            const headingEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headingEls.forEach(el => {
                headings.push({
                    tag: el.tagName.toLowerCase(),
                    text: el.innerText.trim()
                });
            });

            // 3. Imagens do DOM
            const images = [];
            document.querySelectorAll('img').forEach(img => {
                images.push({
                    src: img.src || img.getAttribute('data-src') || '',
                    alt: img.getAttribute('alt') || null,
                    class: img.className || ''
                });
            });

            // 4. Links semânticos (Procura textos genéricos)
            const links = [];
            const genericTerms = ['saiba mais', 'clique aqui', 'leia mais', 'ver mais', 'saiba-mais', 'clique-aqui', 'acesse', 'acessar', 'conheça', 'conhecer'];
            document.querySelectorAll('a').forEach(a => {
                const text = a.innerText.trim().toLowerCase();
                const hasGenericText = genericTerms.some(term => text.includes(term));
                
                links.push({
                    href: a.getAttribute('href') || '',
                    text: a.innerText.trim(),
                    isGeneric: hasGenericText
                });
            });

            // 5. Scripts de Rastreamento (GTM, GA, Pixel)
            const htmlString = document.documentElement.outerHTML;
            const trackers = {
                gtm: htmlString.includes('gtm.js') || htmlString.includes('GTM-'),
                ga: htmlString.includes('analytics.js') || htmlString.includes('gtag') || htmlString.includes('UA-'),
                fbPixel: htmlString.includes('fbevents.js') || htmlString.includes('fbq')
            };

            return {
                title,
                description,
                canonical,
                og: { title: ogTitle, desc: ogDesc, url: ogUrl, image: ogImage },
                headings,
                images,
                links,
                trackers
            };
        }, targetUrl);

        console.log(`💾 Processando arquivos de mídia e tamanhos de download...`);

        // Complementa as imagens com os tamanhos capturados pela rede
        const processedImages = auditData.images.map(img => {
            const sizeInBytes = imageSizes[img.src] || 0;
            const sizeInKb = parseFloat((sizeInBytes / 1024).toFixed(2));
            const contentType = imageContentTypes[img.src] || '';
            const isModern = contentType.includes('webp') || contentType.includes('avif') || img.src.endsWith('.webp') || img.src.endsWith('.avif');

            return {
                ...img,
                sizeKb: sizeInKb,
                contentType,
                isModern
            };
        });

        // ------------------ GERAÇÃO DO RELATÓRIO ------------------
        let markdown = `# Relatório de Auditoria de SEO Técnico\n\n`;
        markdown += `- **URL Analisada:** [${targetUrl}](${targetUrl})\n`;
        markdown += `- **Data da Auditoria:** ${new Date().toLocaleString('pt-BR')}\n`;
        markdown += `- **Status da Resposta:** ✅ ${httpStatus} OK\n\n`;

        markdown += `---\n\n`;

        // 1. Metadados
        markdown += `## 1. Metadados e Configuração de Domínio\n\n`;
        
        // Validação de Title
        const titleLen = auditData.title ? auditData.title.length : 0;
        const titleStatus = titleLen >= 40 && titleLen <= 65 ? '✅ Ideal' : '⚠️ Crítico';
        markdown += `### Title Tag\n`;
        markdown += `- **Conteúdo:** \`${auditData.title || 'NÃO ENCONTRADO'}\`\n`;
        markdown += `- **Tamanho:** ${titleLen} caracteres (${titleStatus} - Recomendado: 40 a 65)\n\n`;

        // Validação de Description
        const descLen = auditData.description ? auditData.description.length : 0;
        const descStatus = descLen >= 110 && descLen <= 160 ? '✅ Ideal' : '⚠️ Fora dos padrões';
        markdown += `### Meta Description\n`;
        markdown += `- **Conteúdo:** \`${auditData.description || 'NÃO ENCONTRADA'}\`\n`;
        markdown += `- **Tamanho:** ${descLen} caracteres (${descStatus} - Recomendado: 110 a 160)\n\n`;

        // Validação de Canonical
        const hasCanonical = !!auditData.canonical;
        const canonicalStatus = hasCanonical ? '✅ Configurada' : '❌ AUSENTE';
        markdown += `### URL Canônica\n`;
        markdown += `- **Status:** ${canonicalStatus}\n`;
        if (hasCanonical) {
            markdown += `- **Valor:** \`${auditData.canonical}\`\n`;
            const domainMismatch = auditData.canonical.includes('www.') !== targetUrl.includes('www.');
            if (domainMismatch) {
                markdown += `- **⚠️ Alerta:** Existe um descompasso de domínio (www vs sem-www) entre a URL buscada e a canônica declarada!\n`;
            }
        }
        markdown += `\n`;

        // OG Tags
        markdown += `### Open Graph (Redes Sociais)\n`;
        markdown += `- **OG Title:** \`${auditData.og.title || 'Não encontrado'}\`\n`;
        markdown += `- **OG Description:** \`${auditData.og.desc || 'Não encontrado'}\`\n`;
        markdown += `- **OG Image:** ${auditData.og.image ? `[Ver Imagem OG](${auditData.og.image})` : '`Não configurada`'}\n\n`;

        markdown += `---\n\n`;

        // 2. Headings
        markdown += `## 2. Hierarquia de Títulos (Headings)\n\n`;
        const h1s = auditData.headings.filter(h => h.tag === 'h1');
        if (h1s.length === 0) {
            markdown += `> ❌ **CRÍTICO:** A página não possui nenhuma tag \`<h1>\`. É indispensável ter exatamente um \`<h1>\` por página.\n\n`;
        } else if (h1s.length > 1) {
            markdown += `> ⚠️ **ATENÇÃO:** A página possui múltiplos \`<h1>\` (${h1s.length} encontrados). O recomendado para o Googlebot é ter exatamente um.\n\n`;
        } else {
            markdown += `> ✅ **Excelente:** Exatamente um título \`<h1>\` detectado.\n\n`;
        }

        markdown += `### Estrutura de Títulos Encontrada:\n`;
        if (auditData.headings.length === 0) {
            markdown += `_Nenhum cabeçalho H1-H6 estruturado no DOM_\n`;
        } else {
            auditData.headings.forEach(h => {
                const indent = h.tag === 'h1' ? '' : h.tag === 'h2' ? '  ' : h.tag === 'h3' ? '    ' : '      ';
                markdown += `${indent}- **${h.tag.toUpperCase()}**: ${h.text}\n`;
            });
        }
        markdown += `\n`;

        markdown += `---\n\n`;

        // 3. Imagens
        markdown += `## 3. Análise de Imagens e Mídia\n\n`;
        const totalImages = processedImages.length;
        const missingAlt = processedImages.filter(img => !img.alt);
        const heavyImages = processedImages.filter(img => img.sizeKb > 300);
        const legacyFormat = processedImages.filter(img => img.src && !img.isModern);

        markdown += `### Sumário de Mídia:\n`;
        markdown += `- Total de Imagens mapeadas no DOM: **${totalImages}**\n`;
        markdown += `- Sem atributo \`alt\` (Acessibilidade/SEO): **${missingAlt.length}** (${missingAlt.length === 0 ? '✅ Excelente' : '❌ Corrigir urgente'})\n`;
        markdown += `- Imagens pesadas (>300KB): **${heavyImages.length}** (${heavyImages.length === 0 ? '✅ Ideal' : '⚠️ Precisa de compressão'})\n`;
        markdown += `- Formatos legados (PNG/JPG): **${legacyFormat.length}** (${legacyFormat.length === 0 ? '✅ 100% Moderno' : '⚠️ Converter para WebP/AVIF'})\n\n`;

        if (processedImages.length > 0) {
            markdown += `### Detalhe das Imagens:\n\n`;
            markdown += `| Origem (Src) | Alt Text | Peso (KB) | Formato | Status SEO |\n`;
            markdown += `|---|---|---|---|---|\n`;
            processedImages.forEach(img => {
                const shortSrc = img.src.length > 50 ? img.src.substring(0, 47) + '...' : img.src;
                const altText = img.alt ? `\`"${img.alt}"\`` : '❌ **SEM ALT**';
                const weight = img.sizeKb > 0 ? `${img.sizeKb} KB` : 'N/A (Cache)';
                const format = img.contentType ? img.contentType.split('/')[1].toUpperCase() : 'N/A';
                
                let status = '✅ OK';
                if (!img.alt) status = '❌ Sem Alt';
                else if (img.sizeKb > 300) status = '⚠️ Muito Pesada';
                else if (!img.isModern) status = '⚠️ Converter p/ WebP';

                markdown += `| [${shortSrc}](${img.src}) | ${altText} | ${weight} | ${format} | ${status} |\n`;
            });
        }
        markdown += `\n`;

        markdown += `---\n\n`;

        // 4. Links semânticos
        markdown += `## 4. Análise Semântica de Links (CTAs)\n\n`;
        const totalLinks = auditData.links.length;
        const genericLinks = auditData.links.filter(l => l.isGeneric);
        
        markdown += `- Total de links rastreados: **${totalLinks}**\n`;
        markdown += `- Links com âncoras genéricas detectados: **${genericLinks.length}** (${genericLinks.length === 0 ? '✅ Perfeito' : '⚠️ Melhorar semântica'})\n\n`;

        if (genericLinks.length > 0) {
            markdown += `### Links recomendados para substituição (Genéricos):\n\n`;
            markdown += `| Texto Atual | Destino (Href) | Recomendação |\n`;
            markdown += `|---|---|---|\n`;
            genericLinks.forEach(l => {
                const shortHref = l.href.length > 50 ? l.href.substring(0, 47) + '...' : l.href;
                markdown += `| *"${l.text}"* | [\`${shortHref}\`](${l.href}) | Mudar para um termo que descreva a ação ou produto de destino. |\n`;
            });
        }
        markdown += `\n`;

        markdown += `---\n\n`;

        // 5. Rastreamento e Analytics
        markdown += `## 5. Ferramentas de Rastreamento (Analytics e Pixels)\n\n`;
        markdown += `| Ferramenta | Presença no Código | Status |\n`;
        markdown += `|---|---|---|\n`;
        markdown += `| Google Tag Manager | ${auditData.trackers.gtm ? '✅ PRESENTE' : '❌ Ausente'} | ${auditData.trackers.gtm ? 'Ativo' : 'Instalar script global'} |\n`;
        markdown += `| Google Analytics | ${auditData.trackers.ga ? '✅ PRESENTE' : '❌ Ausente'} | ${auditData.trackers.ga ? 'Ativo' : 'Instalar gtag/analytics'} |\n`;
        markdown += `| Meta Pixel (Facebook) | ${auditData.trackers.fbPixel ? '✅ PRESENTE' : '❌ Ausente'} | ${auditData.trackers.fbPixel ? 'Ativo' : 'Opcional, recomendado para Ads'} |\n\n`;

        markdown += `---\n\n`;
        markdown += `_Relatório gerado via Antigravity SEO Auditor CLI._`;

        // Escreve o arquivo
        const reportsDir = path.join(process.cwd(), 'artifacts');
        if (!fs.existsSync(reportsDir)){
            fs.mkdirSync(reportsDir);
        }
        const reportPath = path.join(reportsDir, `seo_audit_${hostname}.md`);
        fs.writeFileSync(reportPath, markdown, 'utf-8');

        console.log(`\n======================================================`);
        console.log(`🎉 AUDITORIA CONCLUÍDA COM SUCESSO!`);
        console.log(`📝 Relatório salvo em:`);
        console.log(`   ${reportPath}`);
        console.log(`======================================================\n`);

        // Imprime resumo no console
        console.log(`📋 Resumo Técnico On-Page:`);
        console.log(`- Título: "${auditData.title}" (${titleLen} chars) -> ${titleStatus}`);
        console.log(`- Descrição: "${auditData.description ? auditData.description.substring(0, 50) + '...' : 'Não encontrada'}" -> ${descStatus}`);
        console.log(`- Hierarquia de Cabeçalhos: ${auditData.headings.length} tags encontradas`);
        console.log(`- Imagens sem ALT: ${missingAlt.length}`);
        console.log(`- Imagens pesadas (>300KB): ${heavyImages.length}`);
        console.log(`- Links Genéricos: ${genericLinks.length}`);
        console.log(`- Google Tag Manager ativo: ${auditData.trackers.gtm ? 'Sim' : 'Não'}`);
        console.log(`\n👉 Dica: Abra o arquivo de relatório gerado para ver todos os detalhes.`);

    } catch (err) {
        console.error(`\n❌ Ocorreu um erro crítico durante a auditoria:`, err.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

runAudit();
