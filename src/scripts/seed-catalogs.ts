import { getPayload } from 'payload';
import config from '../../payload.config';
import fs from 'fs';
import path from 'path';

const catalogTitle = 'Catálogo Geral B&B Iluminação';
const catalogDescription = 'Catálogo comercial com as linhas de postes metálicos, acessórios, mastros e soluções metálicas para urbanismo.';
const pdfFileName = 'catalogo-bb-iluminacao.pdf';
const thumbnailFileName = 'poste-curvo-duplo-avenida-noite.png';

async function seedCatalogs() {
    console.log('--- Iniciando Seed de Catálogos ---');
    const payload = await getPayload({ config });

    try {
        const pdfPath = path.join(process.cwd(), 'public', 'downloads', pdfFileName);
        const thumbnailPath = path.join(process.cwd(), 'public', 'images', 'produtos', thumbnailFileName);

        if (!fs.existsSync(pdfPath)) {
            console.error(`Arquivo não encontrado: ${pdfPath}`);
            return;
        }

        if (!fs.existsSync(thumbnailPath)) {
            console.error(`Thumbnail não encontrada: ${thumbnailPath}`);
            return;
        }

        console.log('1. Garantindo PDF e capa na coleção de mídia...');
        const pdfDoc = await upsertMedia(payload, {
            path: pdfPath,
            fileName: pdfFileName,
            mimetype: 'application/pdf',
            alt: catalogTitle,
        });

        const thumbnailDoc = await upsertMedia(payload, {
            path: thumbnailPath,
            fileName: thumbnailFileName,
            mimetype: 'image/png',
            alt: 'Poste curvo duplo B&B em aplicação urbana',
        });

        console.log('2. Registrando na coleção de catálogos...');
        const existingCatalog = await payload.find({
            collection: 'catalogs' as any,
            where: { title: { equals: catalogTitle } },
            limit: 1,
        });

        const catalogData = {
            title: catalogTitle,
            description: catalogDescription,
            thumbnail: thumbnailDoc.id,
            file: pdfDoc.id,
            category: 'geral',
        };

        if (existingCatalog.docs[0]) {
            await payload.update({
                collection: 'catalogs' as any,
                id: existingCatalog.docs[0].id,
                data: catalogData,
            });
            console.log(`Catálogo atualizado! ID: ${existingCatalog.docs[0].id}`);
        } else {
            const catalogDoc = await payload.create({
                collection: 'catalogs' as any,
                data: catalogData,
            });
            console.log(`Catálogo criado! ID: ${catalogDoc.id}`);
        }

        console.log('--- Seed de Catálogos concluído com sucesso! ---');
    } catch (error: any) {
        console.error('Erro no seed de catálogos:', error.message);
        process.exitCode = 1;
    }
}

async function upsertMedia(payload: any, file: { path: string; fileName: string; mimetype: string; alt: string }) {
    const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: file.fileName } },
        limit: 1,
    });

    if (existing.docs[0]) {
        await payload.update({
            collection: 'media',
            id: existing.docs[0].id,
            data: {
                alt: file.alt,
            },
        });
        return existing.docs[0];
    }

    const data = fs.readFileSync(file.path);
    return payload.create({
        collection: 'media',
        data: { alt: file.alt },
        file: {
            data,
            name: file.fileName,
            mimetype: file.mimetype,
            size: data.length,
        },
    });
}

seedCatalogs();
