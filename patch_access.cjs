const fs = require('fs');
const path = require('path');

const dir = 'src/collections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it's a CollectionConfig
    if (content.includes('CollectionConfig = {')) {
        // If it doesn't have access: {
        if (!content.includes('access: {') && !content.includes('access : {')) {
            // Find the slug line or admin line to inject after
            content = content.replace(/(slug:\s*['"][^'"]+['"],)/, "$1\n    access: {\n        read: () => true,\n    },");
            fs.writeFileSync(filePath, content);
            console.log(`Patched ${file}`);
        }
    }
});
