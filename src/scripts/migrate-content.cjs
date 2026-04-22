const https = require('https');
const fs = require('fs');

const WP_API_URL = 'https://bebiluminacao.com.br/wp-json/wp/v2';
const PAYLOAD_API_URL = 'http://localhost:9010/api';

async function fetchWP(endpoint) {
    return new Promise((resolve, reject) => {
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

// TODO: Implementar lógica de upload para Payload
// TODO: Implementar lógica de criação de post no Payload

async function run() {
    try {
        console.log('--- Iniciando Migração ---');
        
        // 1. Pegar posts do WP
        const posts = await fetchWP('/posts?per_page=5');
        console.log(`Encontrados ${posts.length} posts no WordPress.`);
        
        for (const post of posts) {
            console.log(`Processando: ${post.title.rendered} (${post.slug})`);
            // Aqui entra a lógica de mapeamento e inserção no Payload
        }
        
    } catch (e) {
        console.error('Erro fatal na migração:', e.message);
    }
}

run();
