const fs = require('fs');
const https = require('https');

const urls = [
  "https://bebiluminacao.com.br/page-sitemap.xml",
  "https://bebiluminacao.com.br/post-sitemap.xml",
  "https://bebiluminacao.com.br/produtos-sitemap.xml",
  "https://bebiluminacao.com.br/regioes-atendidas-sitemap.xml"
];

const outputFile = 'gsc_urls_consolidadas.txt';
fs.writeFileSync(outputFile, ''); // Limpa o arquivo

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function run() {
  for (const url of urls) {
    console.log('Processando ' + url + '...');
    try {
      const xml = await fetchUrl(url);
      const locs = xml.match(/<loc>(.*?)<\/loc>/g);
      if (locs) {
        const cleanLocs = locs.map(l => l.replace(/<\/?loc>/g, ''));
        fs.appendFileSync(outputFile, cleanLocs.join('\n') + '\n');
        console.log('Extraídas ' + cleanLocs.length + ' URLs');
      } else {
        console.log('Nenhuma URL encontrada.');
      }
    } catch (e) {
      console.log('Erro: ' + e.message);
    }
  }
  console.log('Concluído! Todas as URLs salvas em ' + outputFile);
}

run();
