import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const robotsPath = path.join(root, 'src/app/robots.ts')
const packagePath = path.join(root, 'package.json')
const failures = []

const requiredSearchBots = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'OAI-AdsBot',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
]

const requiredTrainingBlocks = [
  'GPTBot',
  'Google-Extended',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
]

const forbiddenSignals = [
  'Claude-Web',
  "userAgent: ['GPTBot'",
  '"GPTBot", "ChatGPT-User"',
]

function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

function extractArray(source, name) {
  const match = source.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\]`))
  assert(Boolean(match), `Array ausente em robots.ts: ${name}`)

  if (!match) {
    return []
  }

  return [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1])
}

const robots = await readFile(robotsPath, 'utf8')
const packageJson = JSON.parse(await readFile(packagePath, 'utf8'))
const searchBots = extractArray(robots, 'aiSearchAndReferralBots')
const trainingBots = extractArray(robots, 'aiTrainingAndDatasetBots')

for (const bot of requiredSearchBots) {
  assert(searchBots.includes(bot), `Bot de busca/citacao nao liberado: ${bot}`)
  assert(!trainingBots.includes(bot), `Bot de busca/citacao bloqueado indevidamente: ${bot}`)
}

for (const bot of requiredTrainingBlocks) {
  assert(trainingBots.includes(bot), `Bot de treino/dataset nao bloqueado: ${bot}`)
  assert(!searchBots.includes(bot), `Bot de treino/dataset liberado indevidamente: ${bot}`)
}

for (const signal of forbiddenSignals) {
  assert(!robots.includes(signal), `Sinal proibido no robots.ts: ${signal}`)
}

assert(robots.includes("const privatePaths = ['/admin/', '/api/']"), 'Rotas privadas devem bloquear /admin/ e /api/')
assert(robots.includes('userAgent: aiSearchAndReferralBots'), 'robots.ts deve usar regra dedicada para bots de busca/citacao')
assert(robots.includes('userAgent: aiTrainingAndDatasetBots'), 'robots.ts deve usar regra dedicada para bots de treino/dataset')
assert(robots.includes("disallow: '/'"), 'robots.ts deve bloquear bots de treino/dataset na raiz')
assert(packageJson.scripts?.['seo:audit:robots'] === 'node scripts/audit-robots-geo.mjs', 'package.json sem script seo:audit:robots')

if (failures.length > 0) {
  console.error('\nRobots GEO audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`Robots GEO audit passed: ${searchBots.length} search/referral bots allowed and ${trainingBots.length} training/dataset bots blocked.`)
