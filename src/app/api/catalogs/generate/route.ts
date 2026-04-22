import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import puppeteer from 'puppeteer';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const { catalogId } = await req.json();
        
        if (!catalogId) {
            return NextResponse.json({ error: 'ID do catálogo é obrigatório' }, { status: 400 });
        }

        const payload = await getPayload({ config });
        
        // 1. Buscar dados do catálogo para nomear o arquivo
        const catalog = await payload.findByID({
            collection: 'catalogs',
            id: catalogId,
        });

        if (!catalog) {
            return NextResponse.json({ error: 'Catálogo não encontrado' }, { status: 404 });
        }

        // 2. Iniciar Puppeteer para gerar PDF
        // Nota: Em produção/VPS, pode ser necessário passar args específicos como --no-sandbox
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // URL da rota de exportação que criamos
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:9010';
        const exportUrl = `${serverUrl}/catalog-export/${catalogId}`;
        
        await page.goto(exportUrl, {
            waitUntil: 'networkidle0',
        });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });

        await browser.close();

        // 3. Salvar o PDF gerado na coleção de Media do Payload
        const fileName = `catalogo-${catalog.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
        
        const mediaDoc = await payload.create({
            collection: 'media',
            data: {
                alt: `Catálogo Gerado: ${catalog.title}`,
            },
            file: {
                data: Buffer.from(pdfBuffer),
                name: fileName,
                mimetype: 'application/pdf',
                size: pdfBuffer.length,
            },
        });

        // 4. Atualizar o objeto do catálogo com o novo arquivo gerado
        await payload.update({
            collection: 'catalogs',
            id: catalogId,
            data: {
                file: mediaDoc.id,
            },
        });

        return NextResponse.json({ 
            success: true, 
            message: 'Catálogo gerado e salvo com sucesso!',
            fileId: mediaDoc.id,
            url: (mediaDoc as any).url 
        });

    } catch (error: any) {
        console.error('Erro na geração de catálogo:', error);
        return NextResponse.json({ 
            error: 'Falha ao gerar PDF', 
            details: error.message 
        }, { status: 500 });
    }
}
