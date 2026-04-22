import { getPayload } from 'payload';
import config from '../../payload.config';
import fs from 'fs';
import path from 'path';

async function seedCatalogs() {
    console.log('--- Iniciando Seed de Catálogos ---');
    const payload = await getPayload({ config });

    try {
        const filePath = path.join(process.cwd(), 'media', 'catalogo-bnb-iluminacao.pdf');
        if (!fs.existsSync(filePath)) {
            console.error(`Arquivo não encontrado: ${filePath}`);
            return;
        }

        console.log('1. Fazendo upload do PDF para a coleção de mídia...');
        const fileBuffer = fs.readFileSync(filePath);
        const mediaDoc = await payload.create({
            collection: 'media',
            data: { alt: 'Catálogo Geral B&B Iluminação 2025' },
            file: {
                data: fileBuffer,
                name: 'catalogo-bnb-iluminacao.pdf',
                mimetype: 'application/pdf',
                size: fileBuffer.length,
            },
        });

        console.log(`PDF enviado com sucesso! ID: ${mediaDoc.id}`);

        // Usar a mesma imagem do Hero ou uma imagem genérica de catálogo para o thumbnail por enquanto
        // Vou procurar uma imagem de thumbnail padrão ou usar uma imagem de produto
        const { docs: productMedia } = await payload.find({
            collection: 'media',
            where: { filename: { contains: '.jpg' } },
            limit: 1
        });

        const thumbnailId = productMedia[0]?.id || mediaDoc.id;

        console.log('2. Registrando na coleção de catálogos...');
        await payload.create({
            collection: 'catalogs' as any,
            data: {
                title: 'Catálogo Geral B&B Iluminação',
                description: 'Catálogo completo com nossa linha de postes decorativos, braços e iluminação pública.',
                thumbnail: thumbnailId,
                file: mediaDoc.id,
                category: 'geral',
            },
        });

        console.log('--- Seed de Catálogos concluído com sucesso! ---');
    } catch (error: any) {
        console.error('Erro no seed de catálogos:', error.message);
    }
}

seedCatalogs();
