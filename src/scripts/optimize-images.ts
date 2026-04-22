import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const portfolioDir = path.join(process.cwd(), 'public', 'portfolio');

async function optimize() {
  const files = fs.readdirSync(portfolioDir);
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(portfolioDir, file);
      const outputPath = path.join(portfolioDir, file.replace('.png', '.webp'));
      
      console.log(`Convertendo: ${file}...`);
      
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`Pronto: ${path.basename(outputPath)}`);
    }
  }
}

optimize().then(() => console.log('Otimização concluída!')).catch(err => console.error(err));
