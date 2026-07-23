import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const read = (file) => readFile(path.join(root, file), 'utf8')

const [dockerfile, compose, composeVps, deploy] = await Promise.all([
  read('Dockerfile'),
  read('docker-compose.yml'),
  read('docker-compose.vps.yml'),
  read('scripts/deploy-vps.sh'),
])

assert.doesNotMatch(dockerfile, /^ARG PAYLOAD_SECRET$/m)
assert.doesNotMatch(deploy, /--build-arg PAYLOAD_SECRET/)
assert.doesNotMatch(dockerfile, /^ENV PAYLOAD_SECRET=/m)
assert.match(dockerfile, /^RUN PAYLOAD_SECRET=build-time-placeholder-not-for-runtime npm run build$/m)
assert.match(compose, /PAYLOAD_SECRET=\$\{PAYLOAD_SECRET:\?PAYLOAD_SECRET is required\}/)
assert.match(composeVps, /PAYLOAD_SECRET=\$\{PAYLOAD_SECRET:\?PAYLOAD_SECRET is required\}/)

console.log('Docker runtime secret boundary validated.')
