require('dotenv').config();
const apiKey = process.env.GEMINI_API_KEY;
async function run() {
    const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
    const response = await fetch(imagenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            instances: [{ prompt: 'a cat' }],
            parameters: { sampleCount: 1 }
        })
    });
    const data = await response.json();
    console.log(data);
}
run();
