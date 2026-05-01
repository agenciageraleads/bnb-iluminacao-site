const fs = require('fs');
const path = require('path');

function addForceDynamic(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes("export const dynamic = 'force-dynamic'")) {
        content = "export const dynamic = 'force-dynamic';\n" + content;
        fs.writeFileSync(filePath, content);
        console.log("Patched " + filePath);
    }
}

addForceDynamic('src/app/(site)/page.tsx');
addForceDynamic('src/app/(site)/produtos/page.tsx');
addForceDynamic('src/app/(site)/blog/[slug]/page.tsx');
