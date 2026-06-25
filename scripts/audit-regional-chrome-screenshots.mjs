import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const baseUrl = process.env.REGIONAL_VISUAL_BASE_URL ?? process.env.SITE_SMOKE_BASE_URL ?? 'http://127.0.0.1:9043'
const chromeBin = process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const outputDir = fileURLToPath(new URL('../output/seo-regional-visual-2026-06-14/', import.meta.url))

const pages = [
  '/postes-metalicos-sao-paulo',
  '/postes-metalicos-minas-gerais',
  '/postes-metalicos-rio-de-janeiro',
  '/postes-metalicos-parana',
  '/postes-metalicos-santa-catarina',
  '/postes-metalicos-rio-grande-do-sul',
  '/postes-metalicos-bahia',
  '/postes-metalicos-pernambuco',
  '/postes-metalicos-ceara',
  '/postes-metalicos-para',
  '/postes-metalicos-mato-grosso',
  '/postes-metalicos-mato-grosso-do-sul',
  '/postes-metalicos-goias',
  '/postes-metalicos-distrito-federal',
  '/postes-metalicos-tocantins',
]

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 1200 },
]

const failures = []
const rows = []

function absolute(path) {
  return new URL(path, baseUrl).toString()
}

function slug(path) {
  return path.replace(/^\//, '').replaceAll('/', '-')
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

async function fetchWithRetry(path) {
  let lastError

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await fetch(absolute(path), { redirect: 'manual' })
    } catch (error) {
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, attempt * 500))
    }
  }

  throw lastError
}

if (!existsSync(chromeBin)) {
  console.error(`Chrome binary not found: ${chromeBin}`)
  process.exit(1)
}

mkdirSync(outputDir, { recursive: true })

for (const path of pages) {
  const response = await fetchWithRetry(path)
  const html = await response.text()
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length
  const hasWhatsapp = html.includes('https://wa.me/') || html.includes('https://api.whatsapp.com/')

  assert(response.status === 200, `${path} returned ${response.status}`)
  assert(h1Count === 1, `${path} expected one H1, found ${h1Count}`)
  assert(hasWhatsapp, `${path} missing WhatsApp CTA`)

  for (const viewport of viewports) {
    const screenshot = `${outputDir}/${slug(path)}-${viewport.name}.png`

    execFileSync(chromeBin, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=5000',
      `--window-size=${viewport.width},${viewport.height}`,
      `--screenshot=${screenshot}`,
      absolute(path),
    ], {
      stdio: 'ignore',
      timeout: 30_000,
    })

    const size = statSync(screenshot).size
    assert(size > 50_000, `${path} ${viewport.name} screenshot too small: ${size} bytes`)

    rows.push({
      path,
      viewport: viewport.name,
      status: response.status,
      h1Count,
      hasWhatsapp,
      screenshot,
      bytes: size,
    })

    console.log(`${response.status} ${viewport.name} ${path} screenshot=${screenshot} bytes=${size}`)
  }
}

const reportPath = `${outputDir}/regional-chrome-screenshots-report.json`
writeFileSync(reportPath, JSON.stringify({ baseUrl, chromeBin, rows, failures }, null, 2))

if (failures.length > 0) {
  console.error('\nRegional Chrome screenshot audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`\nRegional Chrome screenshot audit passed. Report: ${reportPath}`)
