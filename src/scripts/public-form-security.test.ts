import assert from 'node:assert/strict'
import test from 'node:test'
import { claimSubmission, consumeRateLimit, getTrustedClientIdentity, hasValidMagicBytes, markSubmissionSuccessful, MAX_PUBLIC_UPLOAD_BYTES, releaseSubmissionClaim, resetPublicFormSecurityForTests, validateUploadMetadata } from '../lib/public-form-security.ts'

test.beforeEach(resetPublicFormSecurityForTests)

test('rejects oversized uploads before their content is read', () => {
    const file = new File([], 'projeto.pdf', { type: 'application/pdf' })
    Object.defineProperty(file, 'size', { value: MAX_PUBLIC_UPLOAD_BYTES + 1 })
    assert.equal(validateUploadMetadata(file, ['.pdf']).status, 413)
})

test('returns a rate-limit denial after the allowed legitimate flow', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) assert.equal(await consumeRateLimit('quote:127.0.0.1', 5, 60_000, 0), true)
    assert.equal(await consumeRateLimit('quote:127.0.0.1', 5, 60_000, 0), false)
})

test('rejects a fake MIME payload using magic bytes', () => {
    const file = new File(['<script>'], 'planta.pdf', { type: 'application/pdf' })
    assert.equal(validateUploadMetadata(file, ['.pdf']).ok, true)
    assert.equal(hasValidMagicBytes(new TextEncoder().encode('<script>'), '.pdf'), false)
})

test('accepts a legitimate PDF and keeps a successful claim', async () => {
    const file = new File(['%PDF-1.7'], 'planta.pdf', { type: 'application/pdf' })
    assert.deepEqual(validateUploadMetadata(file, ['.pdf']), { ok: true, extension: '.pdf' })
    assert.equal(hasValidMagicBytes(new TextEncoder().encode('%PDF-1.7'), '.pdf'), true)
    const token = await claimSubmission(['laser', 'cliente@example.com'], 30_000, 0)
    assert.equal(typeof token, 'string')
    assert.equal(await markSubmissionSuccessful(['laser', 'cliente@example.com'], token!, 60_000, 0), true)
    assert.equal(await claimSubmission(['laser', 'cliente@example.com'], 30_000, 1), null)
})

test('allows retry when delivery failed before success was recorded', async () => {
    const submission = ['pintura', 'cliente@example.com']
    const token = await claimSubmission(submission, 30_000, 0)
    assert.equal(typeof token, 'string')
    assert.equal(await releaseSubmissionClaim(submission, token!, 1), true)
    assert.equal(typeof await claimSubmission(submission, 30_000, 1), 'string')
})

test('allows distinct clients while atomically rejecting a concurrent duplicate', async () => {
    const first = ['laser', '192.0.2.1', 'same@example.com']
    const second = ['laser', '192.0.2.2', 'same@example.com']
    const claims = await Promise.all([claimSubmission(first), claimSubmission(first), claimSubmission(second)])
    assert.equal(typeof claims[0], 'string')
    assert.equal(claims[1], null)
    assert.equal(typeof claims[2], 'string')
})

test('an expired owner cannot finalize or release a newer claim', async () => {
    const submission = ['laser', 'ownership@example.com']
    const expiredToken = await claimSubmission(submission, 10, 0)
    const currentToken = await claimSubmission(submission, 10, 11)
    assert.equal(typeof currentToken, 'string')
    assert.equal(await markSubmissionSuccessful(submission, expiredToken!, 100, 12), false)
    assert.equal(await releaseSubmissionClaim(submission, expiredToken!, 12), false)
    assert.equal(await markSubmissionSuccessful(submission, currentToken!, 100, 12), true)
})

test('falls back to conservative local limiting when Redis is unavailable', async () => {
    const previous = process.env.REDIS_URL
    process.env.REDIS_URL = 'redis://127.0.0.1:1'
    assert.equal(await consumeRateLimit('redis-failure', 1, 60_000, 0), true)
    assert.equal(await consumeRateLimit('redis-failure', 1, 60_000, 0), false)
    if (previous === undefined) delete process.env.REDIS_URL
    else process.env.REDIS_URL = previous
    resetPublicFormSecurityForTests()
})

test('ignores spoofable forwarding headers unless a trusted proxy header is configured', () => {
    const previous = process.env.PUBLIC_FORM_TRUSTED_IP_HEADER
    delete process.env.PUBLIC_FORM_TRUSTED_IP_HEADER
    const headers = new Headers({ 'x-forwarded-for': '203.0.113.10', 'cf-connecting-ip': '198.51.100.20' })
    assert.equal(getTrustedClientIdentity(headers), 'unidentified')
    process.env.PUBLIC_FORM_TRUSTED_IP_HEADER = 'cf-connecting-ip'
    assert.equal(getTrustedClientIdentity(headers), '198.51.100.20')
    if (previous === undefined) delete process.env.PUBLIC_FORM_TRUSTED_IP_HEADER
    else process.env.PUBLIC_FORM_TRUSTED_IP_HEADER = previous
})
