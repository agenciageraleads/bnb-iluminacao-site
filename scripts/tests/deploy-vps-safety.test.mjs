import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const deploy = await readFile(path.join(root, 'scripts/deploy-vps.sh'), 'utf8')

for (const runtimeRequirement of ['PAYLOAD_SECRET', 'BLOG_ENGINE_SECRET', 'REDIS_URL']) {
  assert.match(deploy, new RegExp(`for required in PAYLOAD_SECRET BLOG_ENGINE_SECRET REDIS_URL`))
  assert.match(deploy, new RegExp(`Service spec sem variável obrigatória`))
}

assert.match(deploy, /MEDIA_VOLUME="bnb-platform_media_data"/)
assert.match(deploy, /MEDIA_TARGET="\/app\/media"/)
assert.match(deploy, /PREVIOUS_IMAGE=/)
assert.match(deploy, /--update-failure-action rollback/)
assert.match(deploy, /--update-order start-first/)
assert.match(deploy, /PUBLIC_FORM_TRUSTED_IP_HEADER=x-real-ip/)
assert.match(deploy, /UPDATE_FLAGS=\(--detach=true/)
assert.match(deploy, /docker service update --detach=true --image '\$\{PREVIOUS_IMAGE\}'/)
assert.match(deploy, /wait_for_convergence/)
assert.match(deploy, /rollback_release/)
assert.match(deploy, /curl --fail/)
assert.match(deploy, /RELEASE_WINDOW_SECONDS:-285/)
assert.doesNotMatch(deploy, /--build-arg PAYLOAD_SECRET/)

const preflightPosition = deploy.indexOf('REMOTE_PREFLIGHT')
const updatePosition = deploy.indexOf('docker service update${REMOTE_UPDATE}')
assert.ok(preflightPosition >= 0 && preflightPosition < updatePosition, 'runtime preflight must precede service update')

console.log('Site deploy safety contract validated.')
