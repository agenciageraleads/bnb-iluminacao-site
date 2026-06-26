import { mkdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const baseUrl = process.env.REGIONAL_RENDER_BASE_URL ?? process.env.SITE_SMOKE_BASE_URL ?? 'http://localhost:9010'
const outputDir = new URL('../output/playwright/seo-regional-ufs/', import.meta.url)

const pages = [
  ['/postes-metalicos-sao-paulo', 'Postes metalicos para projetos em Sao Paulo'],
  ['/postes-metalicos-minas-gerais', 'Postes metalicos para projetos em Minas Gerais'],
  ['/postes-metalicos-rio-de-janeiro', 'Postes metalicos para projetos em Rio de Janeiro'],
  ['/postes-metalicos-parana', 'Postes metalicos para projetos em Parana'],
  ['/postes-metalicos-santa-catarina', 'Postes metalicos para projetos em Santa Catarina'],
  ['/postes-metalicos-rio-grande-do-sul', 'Postes metalicos para projetos em Rio Grande do Sul'],
  ['/postes-metalicos-bahia', 'Postes metalicos para projetos em Bahia'],
  ['/postes-metalicos-pernambuco', 'Postes metalicos para projetos em Pernambuco'],
  ['/postes-metalicos-ceara', 'Postes metalicos para projetos em Ceara'],
  ['/postes-metalicos-para', 'Postes metalicos para projetos em Para'],
  ['/postes-metalicos-mato-grosso', 'Postes metalicos para projetos em Mato Grosso'],
  ['/postes-metalicos-mato-grosso-do-sul', 'Postes metalicos para projetos em Mato Grosso do Sul'],
  ['/postes-metalicos-goias', 'Postes metalicos para projetos em Goias'],
  ['/postes-metalicos-distrito-federal', 'Postes metalicos para projetos em Distrito Federal'],
  ['/postes-metalicos-tocantins', 'Postes metalicos para projetos em Tocantins'],
]

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 1200 },
]

const forbiddenSignals = [
  'LocalBusiness',
  'GeoCoordinates',
  'addressLocality',
  'B&B - Unidade',
  '/lp/estados/',
  '/regioes-atendidas/cidades/',
  '/lp/postes-metalicos/cidades/',
]

const failures = []
const rows = []

function absolute(path) {
  return new URL(path, baseUrl).toString()
}

function slug(path) {
  return path.replace(/^\//, '').replaceAll('/', '-')
}

function readProjectFile(path) {
  return execFileSync('/bin/cat', [path], {
    cwd: projectRoot,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 8,
  })
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

mkdirSync(outputDir, { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  for (const [path, expectedH1] of pages) {
    for (const viewport of viewports) {
      const page = await browser.newPage()
      await page.setViewport(viewport)

      const response = await page.goto(absolute(path), {
        waitUntil: 'domcontentloaded',
        timeout: 30_000,
      })

      await page.waitForSelector('h1', { timeout: 15_000 })
      await page.waitForFunction(() => document.fonts?.status === 'loaded' || true, { timeout: 5_000 }).catch(() => {})
      await new Promise((resolve) => setTimeout(resolve, 1_000))

      const result = await page.evaluate((expected, forbidden) => {
        const h1s = [...document.querySelectorAll('h1')].map((node) => node.textContent?.trim() ?? '')
        const bodyText = document.body.textContent ?? ''
        const html = document.documentElement.outerHTML
        const linkedImages = [...document.images].filter((image) => image.currentSrc || image.src)
        const loadedImages = linkedImages.filter((image) => image.complete && image.naturalWidth > 0)
        const whatsappLinks = [...document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"]')]
        const horizontalOverflow = document.documentElement.scrollWidth - window.innerWidth
        const forbiddenFound = forbidden.filter((signal) => html.includes(signal))

        return {
          title: document.title,
          h1Count: h1s.length,
          h1: h1s[0] ?? '',
          h1Matches: h1s.some((text) => text.includes(expected)),
          hasWhatsapp: whatsappLinks.length > 0,
          imageCount: linkedImages.length,
          loadedImageCount: loadedImages.length,
          horizontalOverflow,
          forbiddenFound,
          hasRegionalBadge: bodyText.includes('/') || bodyText.includes('Centro-Oeste') || bodyText.includes('Sudeste') || bodyText.includes('Sul') || bodyText.includes('Nordeste') || bodyText.includes('Norte'),
        }
      }, expectedH1, forbiddenSignals)

      const status = response?.status() ?? 0
      const screenshotPath = new URL(`${slug(path)}-${viewport.name}.png`, outputDir)
      await page.screenshot({
        path: fileURLToPath(screenshotPath),
        fullPage: false,
      })

      rows.push({
        path,
        viewport: viewport.name,
        status,
        h1: result.h1,
        h1Count: result.h1Count,
        loadedImageCount: result.loadedImageCount,
        horizontalOverflow: result.horizontalOverflow,
        screenshot: fileURLToPath(screenshotPath),
      })

      console.log(`${status} ${viewport.name} ${path} h1=${result.h1Count} images=${result.loadedImageCount}/${result.imageCount} overflow=${result.horizontalOverflow}`)

      assert(status === 200, `${path} ${viewport.name} returned ${status}`)
      assert(result.h1Count === 1, `${path} ${viewport.name} expected one H1, found ${result.h1Count}`)
      assert(result.h1Matches, `${path} ${viewport.name} H1 mismatch: ${result.h1}`)
      assert(result.hasWhatsapp, `${path} ${viewport.name} missing WhatsApp CTA`)
      assert(result.loadedImageCount >= 2, `${path} ${viewport.name} expected at least two loaded images, found ${result.loadedImageCount}`)
      assert(result.horizontalOverflow <= 4, `${path} ${viewport.name} has horizontal overflow ${result.horizontalOverflow}px`)
      assert(result.forbiddenFound.length === 0, `${path} ${viewport.name} has forbidden signals: ${result.forbiddenFound.join(', ')}`)
      assert(result.hasRegionalBadge, `${path} ${viewport.name} missing regional context text`)

      await page.close()
    }
  }
} finally {
  await browser.close()
}

const reportPath = new URL('regional-render-audit.json', outputDir)
writeFileSync(fileURLToPath(reportPath), JSON.stringify({ baseUrl, rows, failures }, null, 2))

if (failures.length > 0) {
  console.error('\nRegional render audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`\nRegional render audit passed. Report: ${fileURLToPath(reportPath)}`)
