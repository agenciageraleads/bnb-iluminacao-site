import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')
const failures = []
const warnings = []

const governanceFile = 'src/lib/seo/nap-governance.json'

const files = [
  'src/components/layout/footer.tsx',
  'src/app/(site)/layout.tsx',
  'src/app/(site)/contato/page.tsx',
  'src/app/actions/leads.ts',
  'src/app/actions/service-quote.ts',
  'src/app/(site)/catalog-export/[id]/page.tsx',
  'src/components/ui/whatsapp-link.tsx',
  'src/components/ui/floating-whatsapp.tsx',
  'src/components/sections/portfolio.tsx',
  'src/app/(site)/lp/mastros-para-bandeira/page.tsx',
  'src/lib/seo/schema.ts',
]

const patterns = {
  emails: /[a-z0-9._%+-]+@bebiluminacao\.com(?:\.br)?/gi,
  phones: /\+?55[\s-]?\(?62\)?[\s-]?3576[\s-]?1988|\(62\)\s*3576-1988/gi,
  whatsapps: /(?:wa\.me\/|phoneNumber\s*=\s*["'])556235761988/gi,
  cnpj: /14\.401\.288\/000[12]-[0-9]{2}/gi,
  addressSignals: /Rua CV10|Rua CV 10|CV-10|Residencial Centerville|Center Ville|Goi[aâ]nia\s*-\s*GO|Goiania\s*-\s*GO|Goiania,\s*GO/gi,
}

function normalizeEmail(value) {
  return value.toLowerCase()
}

function isOperationalEmail(value) {
  return value.startsWith('leads@')
}

function normalizePhone(value) {
  const digits = value.replace(/\D/g, '')
  if (digits.endsWith('6235761988')) {
    return '556235761988'
  }
  return digits
}

function normalizeWhatsapp(value) {
  return value.includes('556235761988') ? '556235761988' : value
}

function normalizeOptionalPhone(value) {
  return value ? normalizePhone(value) : ''
}

function collectMatches(source, regexp, normalize = (value) => value) {
  return [...source.matchAll(regexp)].map((match) => normalize(match[0]))
}

async function readNapGovernance() {
  try {
    return JSON.parse(await readFile(path.join(root, governanceFile), 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      warnings.push(`Arquivo de governanca NAP nao encontrado: ${governanceFile}`)
      return {}
    }
    failures.push(`Arquivo de governanca NAP invalido ou ilegivel: ${governanceFile}`)
    return {}
  }
}

const governance = await readNapGovernance()

const byFile = []
const totals = {
  publicEmails: new Set(),
  operationalEmails: new Set(),
  phones: new Set(),
  whatsapps: new Set(),
  cnpjs: new Set(),
  addressSignals: new Set(),
}

for (const file of files) {
  const absolutePath = path.join(root, file)
  let source = ''

  try {
    source = await readFile(absolutePath, 'utf8')
  } catch (error) {
    failures.push(`Arquivo NAP esperado nao encontrado ou ilegivel: ${file}`)
    continue
  }

  const found = {
    emails: collectMatches(source, patterns.emails, normalizeEmail),
    phones: collectMatches(source, patterns.phones, normalizePhone),
    whatsapps: collectMatches(source, patterns.whatsapps, normalizeWhatsapp),
    cnpjs: collectMatches(source, patterns.cnpj),
    addressSignals: collectMatches(source, patterns.addressSignals),
  }

  for (const value of found.emails) {
    if (isOperationalEmail(value)) {
      totals.operationalEmails.add(value)
    } else {
      totals.publicEmails.add(value)
    }
  }
  for (const value of found.phones) totals.phones.add(value)
  for (const value of found.whatsapps) totals.whatsapps.add(value)
  for (const value of found.cnpjs) totals.cnpjs.add(value)
  for (const value of found.addressSignals) totals.addressSignals.add(value)

  const hasAnyValue = Object.values(found).some((items) => items.length > 0)
  if (hasAnyValue) {
    byFile.push({ file, found })
  }
}

const publicEmailList = [...totals.publicEmails].sort()
const operationalEmailList = [...totals.operationalEmails].sort()
const phoneList = [...totals.phones].sort()
const whatsappList = [...totals.whatsapps].sort()
const cnpjList = [...totals.cnpjs].sort()
const addressSignalList = [...totals.addressSignals].sort()

const officialPublicEmail = (governance.officialPublicEmail ?? '').toLowerCase()
const officialPhone = normalizeOptionalPhone(governance.officialPhone ?? '')
const officialWhatsapp = normalizeOptionalPhone(governance.officialWhatsapp ?? '')
const officialCnpj = governance.officialCnpj ?? ''
const cnpjExposure = governance.cnpjExposure ?? 'pending'
const requiredAddressSignals = governance.requiredAddressSignals ?? []

if (publicEmailList.length > 1) {
  warnings.push(`E-mails publicos/comerciais B&B divergentes encontrados: ${publicEmailList.join(', ')}`)
}

if (phoneList.length > 1) {
  warnings.push(`Telefones normalizados divergentes encontrados: ${phoneList.join(', ')}`)
}

if (whatsappList.length > 1) {
  warnings.push(`WhatsApps divergentes encontrados: ${whatsappList.join(', ')}`)
}

if (cnpjList.length > 1) {
  warnings.push(`CNPJs divergentes encontrados: ${cnpjList.join(', ')}`)
}

if (addressSignalList.length === 0) {
  warnings.push('Nenhum sinal de endereco encontrado nos arquivos auditados.')
}

if (strict) {
  if (!officialPublicEmail) {
    failures.push(`Modo strict exige officialPublicEmail preenchido em ${governanceFile}.`)
  }

  if (!officialPhone) {
    failures.push(`Modo strict exige officialPhone preenchido em ${governanceFile}.`)
  }

  if (!officialWhatsapp) {
    failures.push(`Modo strict exige officialWhatsapp preenchido em ${governanceFile}.`)
  }

  if (cnpjExposure === 'pending') {
    failures.push(`Modo strict exige cnpjExposure definido como visible ou hidden em ${governanceFile}.`)
  }

  if (cnpjExposure === 'visible' && !officialCnpj) {
    failures.push(`Modo strict exige officialCnpj preenchido quando cnpjExposure=visible em ${governanceFile}.`)
  }

  if (requiredAddressSignals.length === 0) {
    failures.push(`Modo strict exige requiredAddressSignals preenchido em ${governanceFile}.`)
  }

  if (publicEmailList.length !== 1) {
    failures.push('Modo strict exige exatamente 1 e-mail publico/comercial B&B oficial no conjunto auditado.')
  }

  if (officialPublicEmail && publicEmailList.length === 1 && publicEmailList[0] !== officialPublicEmail) {
    failures.push(`E-mail publico encontrado (${publicEmailList[0]}) diverge de officialPublicEmail (${officialPublicEmail}).`)
  }

  if (phoneList.length !== 1) {
    failures.push('Modo strict exige exatamente 1 telefone B&B normalizado no conjunto auditado.')
  }

  if (officialPhone && phoneList.length === 1 && phoneList[0] !== officialPhone) {
    failures.push(`Telefone encontrado (${phoneList[0]}) diverge de officialPhone (${officialPhone}).`)
  }

  if (whatsappList.length !== 1) {
    failures.push('Modo strict exige exatamente 1 WhatsApp B&B no conjunto auditado.')
  }

  if (officialWhatsapp && whatsappList.length === 1 && whatsappList[0] !== officialWhatsapp) {
    failures.push(`WhatsApp encontrado (${whatsappList[0]}) diverge de officialWhatsapp (${officialWhatsapp}).`)
  }

  if (cnpjExposure === 'hidden' && cnpjList.length > 0) {
    failures.push(`Modo strict com cnpjExposure=hidden nao permite CNPJ exposto: ${cnpjList.join(', ')}`)
  }

  if (cnpjExposure === 'visible') {
    if (cnpjList.length !== 1) {
      failures.push('Modo strict com cnpjExposure=visible exige exatamente 1 CNPJ B&B no conjunto auditado.')
    }

    if (officialCnpj && cnpjList.length === 1 && cnpjList[0] !== officialCnpj) {
      failures.push(`CNPJ encontrado (${cnpjList[0]}) diverge de officialCnpj (${officialCnpj}).`)
    }
  }

  for (const signal of requiredAddressSignals) {
    if (!addressSignalList.includes(signal)) {
      failures.push(`Sinal de endereco oficial ausente no conjunto auditado: ${signal}`)
    }
  }
}

console.log('NAP audit summary')
console.log(`mode=${strict ? 'strict' : 'inventory'}`)
console.log(`files_with_nap=${byFile.length}`)
console.log(`public_emails=${publicEmailList.join(', ') || 'none'}`)
console.log(`operational_emails=${operationalEmailList.join(', ') || 'none'}`)
console.log(`phones=${phoneList.join(', ') || 'none'}`)
console.log(`whatsapps=${whatsappList.join(', ') || 'none'}`)
console.log(`cnpjs=${cnpjList.join(', ') || 'none'}`)
console.log(`address_signals=${addressSignalList.length}`)
console.log(`governance_public_email=${officialPublicEmail || 'unset'}`)
console.log(`governance_phone=${officialPhone || 'unset'}`)
console.log(`governance_whatsapp=${officialWhatsapp || 'unset'}`)
console.log(`governance_cnpj_exposure=${cnpjExposure}`)
console.log(`governance_address_signals=${requiredAddressSignals.length}`)

if (warnings.length > 0) {
  console.warn('\nNAP audit warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (failures.length > 0) {
  console.error('\nNAP audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('\nNAP audit completed.')
