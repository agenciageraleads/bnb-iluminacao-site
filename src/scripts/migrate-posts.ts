import { getPayload } from 'payload';
import config from '../../payload.config';
import fs from 'fs';
import https from 'https';
import path from 'path';

const WP_API_URL = 'https://bebiluminacao.com.br/wp-json/wp/v2';

async function fetchWP(endpoint: string) {
    return new Promise<any>((resolve, reject) => {
        const url = `${WP_API_URL}${endpoint}`;
        console.log(`Fetching WP: ${url}`);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Status ${res.statusCode}: ${data}`));
                    return;
                }
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function downloadImage(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Falha ao baixar imagem: status ${res.statusCode}`));
                return;
            }
            const chunks: any[] = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
        });
    });
}

async function processHtmlImages(html: string, payload: any): Promise<string> {
    let processedHtml = html;
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const matches = [];

    // 1. Encontrar todos os matches primeiro para evitar problemas de loop com replace assíncrono
    while ((match = imgRegex.exec(html)) !== null) {
        matches.push(match[1]);
    }

    for (const originalUrl of matches) {
        // Apenas processar imagens do domínio antigo ou relativas
        if (originalUrl.includes('bebiluminacao.com.br') || originalUrl.startsWith('/')) {
            const fullUrl = originalUrl.startsWith('/') ? `https://bebiluminacao.com.br${originalUrl}` : originalUrl;
            const fileName = path.basename(fullUrl.split('?')[0]);
            
            console.log(`  > Processando imagem interna: ${fileName}`);
            
            try {
                const imageBuffer = await downloadImage(fullUrl);
                const mediaDoc = await payload.create({
                    collection: 'media' as any,
                    data: { alt: 'Imagem do post' },
                    file: {
                        data: imageBuffer,
                        name: fileName,
                        mimetype: 'image/jpeg', // Simplificado, Payload detecta melhor no upload
                        size: imageBuffer.length,
                    },
                });
                
                // Substituir URL antiga pela nova URL do Payload
                const newUrl = mediaDoc.url;
                processedHtml = processedHtml.replace(originalUrl, newUrl);
                console.log(`    ✓ Imagem interna migrada: ${newUrl}`);
            } catch (err: any) {
                console.error(`    ✕ Erro na imagem interna ${originalUrl}: ${err.message}`);
            }
        }
    }

    return processedHtml;
}

async function migrate() {
    console.log('--- Iniciando Migração de Posts com Integridade de Mídia ---');
    const payload = await getPayload({ config });

    try {
        // Pegar posts (Aumentado para 100 para migração total)
        const wpPosts = await fetchWP('/posts?per_page=100&_embed');
        console.log(`Encontrados ${wpPosts.length} posts no WordPress.`);

        for (const wpPost of wpPosts) {
            console.log(`\n---------------------------------------------------`);
            console.log(`Processando: ${wpPost.title.rendered}`);

            // Verificar se o post já existe (para teste, vamos deletar se existir ou apenas pular)
            const { docs: existingPosts } = await payload.find({
                collection: 'blog',
                where: { slug: { equals: wpPost.slug } }
            });

            if (existingPosts.length > 0) {
                console.log(`Post "${wpPost.slug}" já existe. Atualizando conteúdo para corrigir imagens.`);
                // Opcional: deletar e recriar ou apenas atualizar
                // Para este teste, vamos apenas atualizar o corpo
            }

            // 1. Tratar Imagem de Destaque
            let featuredImageId = null;
            const embeddedMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
            if (embeddedMedia) {
                const imageUrl = embeddedMedia.source_url;
                const fileName = path.basename(imageUrl);
                
                try {
                    const imageBuffer = await downloadImage(imageUrl);
                    const mediaDoc = await payload.create({
                        collection: 'media' as any,
                        data: { alt: wpPost.title.rendered },
                        file: {
                            data: imageBuffer,
                            name: fileName,
                            mimetype: embeddedMedia.mime_type || 'image/jpeg',
                            size: imageBuffer.length,
                        },
                    });
                    featuredImageId = mediaDoc.id;
                    console.log('Imagem de destaque importada.');
                } catch (imgErr: any) {
                    console.error(`Erro na imagem de destaque: ${imgErr.message}`);
                }
            }

            // 2. Processar Imagens Internas no HTML
            console.log('Processando conteúdo HTML do WordPress...');
            const processedBodyHtml = await processHtmlImages(wpPost.content.rendered, payload);

            // 3. Criar ou Atualizar Post no Payload
            const postData = {
                title: wpPost.title.rendered,
                slug: wpPost.slug,
                status: 'published' as const,
                author: 'Eng. Lucas Borges',
                summary: wpPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 200),
                bodyHtml: processedBodyHtml,
                featuredImage: featuredImageId,
                meta: {
                    title: wpPost.title.rendered,
                    description: wpPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
                }
            };

            if (existingPosts.length > 0) {
                await payload.update({
                    collection: 'blog',
                    id: existingPosts[0].id,
                    data: postData
                });
                console.log('Post atualizado com imagens locais.');
            } else {
                await payload.create({
                    collection: 'blog',
                    data: postData
                });
                console.log('Post criado com imagens locais.');
            }
        }

        console.log('\n--- Migração de integridade concluída! ---');
    } catch (error: any) {
        console.error('Erro crítico na migração:', error.message);
    }
}

migrate();
