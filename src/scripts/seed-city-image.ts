import { getPayload } from 'payload';
import config from '../../payload.config';
import fs from 'fs';
import path from 'path';

async function seedCityImage() {
  const payload = await getPayload({ config });
  
  const imagePath = '/Users/Lucas-Lenovo/.gemini/antigravity/brain/82dda2b7-96a5-45d8-8d3a-d9286f4745ee/goiania_night_lighting_1776131439934.png';
  
  if (!fs.existsSync(imagePath)) {
    console.error('Imagem não encontrada no path especificado.');
    return;
  }

  try {
    // 1. Criar ou buscar a região Goiânia
    const { docs: regions } = await payload.find({
      collection: 'regions' as any,
      where: { slug: { equals: 'goiania' } }
    });

    let regionId;
    if (regions.length === 0) {
      const newRegion = await payload.create({
        collection: 'regions' as any,
        data: {
          cityName: 'Goiânia',
          slug: 'goiania',
        }
      });
      regionId = newRegion.id;
    } else {
      regionId = regions[0].id;
    }

    // 2. Upload da imagem
    console.log('Fazendo upload da foto de Goiânia...');
    const mediaDoc = await payload.create({
      collection: 'media',
      data: { alt: 'Goiânia à noite - Iluminação Pública' },
      file: {
        data: fs.readFileSync(imagePath),
        name: 'goiania-night.png',
        mimetype: 'image/png',
        size: fs.statSync(imagePath).size,
      },
    });

    // 3. Vincular imagem à região
    await payload.update({
      collection: 'regions' as any,
      id: regionId,
      data: {
        featuredImage: mediaDoc.id,
      }
    });

    console.log('Sucesso! Foto vinculada a Goiânia.');
  } catch (error) {
    console.error('Erro ao semear imagem:', error);
  }
}

seedCityImage();
