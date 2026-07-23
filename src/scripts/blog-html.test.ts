import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { sanitizeBlogHtml, serializeJsonLd } from '../lib/blog-html.ts'

test('removes executable HTML while preserving technical article markup', () => {
    const input = `
        <h2>Dimensionamento</h2>
        <p onclick="alert(1)">Use <strong>NBR 5101</strong>.</p>
        <script>alert(document.cookie)</script>
        <img src="javascript:alert(1)" onerror="alert(1)" alt="Poste">
        <table><tbody><tr><th scope="col">Altura</th><td>8 m</td></tr></tbody></table>
    `

    const result = sanitizeBlogHtml(input)

    assert.match(result, /<h2>Dimensionamento<\/h2>/)
    assert.match(result, /<strong>NBR 5101<\/strong>/)
    assert.match(result, /<table>/)
    assert.doesNotMatch(result, /script|onclick|onerror|javascript:/i)
})

test('hardens links opened in a new tab and rejects unsafe protocols', () => {
    const result = sanitizeBlogHtml(
        '<a href="https://example.com" target="_blank">Norma</a><a href="data:text/html,x">X</a>',
    )

    assert.match(result, /rel="noopener noreferrer"/)
    assert.doesNotMatch(result, /data:text\/html/)
})

test('serializes JSON-LD without allowing a script breakout', () => {
    const result = serializeJsonLd({ headline: '</script><script>alert(1)</script>\u2028' })

    assert.doesNotMatch(result, /<\/script>/)
    assert.match(result, /\\u003c\/script>/)
    assert.match(result, /\\u2028/)
})

test('keeps AI-created posts in human-review draft state', async () => {
    const route = await readFile(new URL('../app/api/blog-engine/route.ts', import.meta.url), 'utf8')

    assert.match(route, /status:\s*['"]draft['"]/)
    assert.doesNotMatch(route, /status:\s*['"]published['"]/)
})

test('public blog queries only return published posts', async () => {
    const data = await readFile(new URL('../lib/data.ts', import.meta.url), 'utf8')

    assert.equal((data.match(/status:\s*\{\s*equals:\s*['"]published['"]\s*\}/g) ?? []).length, 2)
})
