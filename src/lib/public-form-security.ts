import { createHash, randomUUID } from 'node:crypto'
import { createClient, type RedisClientType } from 'redis'

export const MAX_PUBLIC_UPLOAD_BYTES = 10 * 1024 * 1024

type Entry = { count: number; expiresAt: number }
type HeaderReader = { get(name: string): string | null }

const rateLimits = new Map<string, Entry>()
const submissions = new Map<string, { token: string; expiresAt: number }>()
let redisClient: RedisClientType | undefined

function hash(values: string[]) {
    return createHash('sha256').update(values.join('\u0000')).digest('hex')
}

function getRedis() {
    const url = process.env.REDIS_URL
    if (!url) return undefined
    if (!redisClient) {
        redisClient = createClient({ url, socket: { connectTimeout: 100, reconnectStrategy: false } })
        redisClient.on('error', error => console.error('Public form Redis error', error))
    }
    return redisClient
}

async function connectedRedis() {
    const client = getRedis()
    if (client && !client.isOpen) await client.connect()
    return client
}

async function withRedisFallback<T>(operation: (client: RedisClientType) => Promise<T>, fallback: () => T) {
    try {
        const client = await connectedRedis()
        return client ? await operation(client) : fallback()
    } catch (error) {
        console.error('Public form Redis unavailable; using conservative process-local protection', error)
        return fallback()
    }
}

export function getTrustedClientIdentity(headers: HeaderReader) {
    // This header is trusted only when the origin accepts traffic exclusively from
    // the named reverse proxy and that proxy overwrites it. Otherwise all clients
    // share a fail-safe bucket; arbitrary forwarded headers are deliberately ignored.
    const configured = process.env.PUBLIC_FORM_TRUSTED_IP_HEADER?.toLowerCase()
    if (!configured || !['cf-connecting-ip', 'x-real-ip'].includes(configured)) {
        if (process.env.NODE_ENV === 'production') throw new Error('PUBLIC_FORM_TRUSTED_IP_HEADER must be configured in production')
        return 'unidentified'
    }
    const value = headers.get(configured)?.trim()
    return value && /^[0-9a-f:.]+$/i.test(value) ? value : 'unidentified'
}

export async function consumeRateLimit(key: string, limit = 5, windowMs = 10 * 60_000, now = Date.now()) {
    return withRedisFallback(async client => {
        const redisKey = `public-form:rate:${hash([key, String(Math.floor(now / windowMs))])}`
        const count = await client.incr(redisKey)
        if (count === 1) await client.pExpire(redisKey, windowMs)
        return count <= limit
    }, () => {
    const current = rateLimits.get(key)
    if (!current || current.expiresAt <= now) {
        rateLimits.set(key, { count: 1, expiresAt: now + windowMs })
        return true
    }
    if (current.count >= limit) return false
    current.count += 1
    return true
    })
}

export async function claimSubmission(values: string[], claimTtlMs = 30_000, now = Date.now()) {
    const key = hash(values)
    const token = randomUUID()
    return withRedisFallback(async client => (await client.set(`public-form:submission:${key}`, token, { PX: claimTtlMs, NX: true })) === 'OK' ? token : null, () => {
        if ((submissions.get(key)?.expiresAt ?? 0) > now) return null
        submissions.set(key, { token, expiresAt: now + claimTtlMs })
        return token
    })
}

export async function markSubmissionSuccessful(values: string[], token: string, ttlMs = 2 * 60_000, now = Date.now()) {
    const key = hash(values)
    return withRedisFallback(async client => Number(await client.eval(
        `if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('pexpire', KEYS[1], ARGV[2]) else return 0 end`,
        { keys: [`public-form:submission:${key}`], arguments: [token, String(ttlMs)] }
    )) === 1, () => {
        const current = submissions.get(key)
        if (current?.token !== token || current.expiresAt <= now) return false
        submissions.set(key, { token, expiresAt: now + ttlMs })
        return true
    })
}

export async function releaseSubmissionClaim(values: string[], token: string, now = Date.now()) {
    const key = hash(values)
    return withRedisFallback(async client => Number(await client.eval(
        `if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end`,
        { keys: [`public-form:submission:${key}`], arguments: [token] }
    )) === 1, () => {
        const current = submissions.get(key)
        if (current?.token !== token || current.expiresAt <= now) return false
        submissions.delete(key)
        return true
    })
}

const signatures: Record<string, (bytes: Uint8Array) => boolean> = {
    '.pdf': bytes => startsWith(bytes, [0x25, 0x50, 0x44, 0x46]),
    '.png': bytes => startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    '.jpg': bytes => startsWith(bytes, [0xff, 0xd8, 0xff]),
    '.jpeg': bytes => startsWith(bytes, [0xff, 0xd8, 0xff]),
    '.dwg': bytes => new TextDecoder().decode(bytes.slice(0, 6)).startsWith('AC10'),
    '.dxf': bytes => /^(\s*0\s*\r?\nSECTION|AutoCAD Binary DXF)/i.test(new TextDecoder().decode(bytes.slice(0, 64))),
}

const mimeByExtension: Record<string, Set<string>> = {
    '.pdf': new Set(['application/pdf']), '.png': new Set(['image/png']),
    '.jpg': new Set(['image/jpeg']), '.jpeg': new Set(['image/jpeg']),
    '.dwg': new Set(['application/acad', 'application/x-acad', 'application/octet-stream', 'image/vnd.dwg']),
    '.dxf': new Set(['application/dxf', 'application/x-dxf', 'application/octet-stream', 'image/vnd.dxf']),
}

export function validateUploadMetadata(file: File, allowedExtensions: string[]) {
    if (file.size > MAX_PUBLIC_UPLOAD_BYTES) return { ok: false as const, status: 413, error: 'O arquivo deve ter no máximo 10MB.' }
    const extension = file.name.toLowerCase().match(/\.[a-z0-9]+$/)?.[0] ?? ''
    if (!allowedExtensions.includes(extension) || !mimeByExtension[extension]?.has(file.type.toLowerCase())) return { ok: false as const, status: 415, error: 'Formato de arquivo não permitido.' }
    return { ok: true as const, extension }
}

export function hasValidMagicBytes(bytes: Uint8Array, extension: string) { return signatures[extension]?.(bytes) === true }
export function escapeHtml(value: string) { return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!) }
function startsWith(bytes: Uint8Array, signature: number[]) { return signature.every((value, index) => bytes[index] === value) }
export function resetPublicFormSecurityForTests() { rateLimits.clear(); submissions.clear(); redisClient = undefined }
