import { createSign } from 'node:crypto'

// Cliente mínimo de leitura pro GA4 Data API, sem dependência nova (só node:crypto + fetch).
// Reusa a mesma service account do Google já usada em outras integrações do workspace
// (Sheets/Search Console/GTM), escopo analytics.readonly já concedido na propriedade GA4 da B&B.
// Nunca grava nada no Google, só lê.

function base64url(input: Buffer | string): string {
    return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function getGoogleAccessToken(): Promise<string> {
    const clientEmail = process.env.GA4_SERVICE_ACCOUNT_EMAIL || ''
    const privateKey = (process.env.GA4_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n')
    if (!clientEmail || !privateKey) {
        throw new Error('GA4_SERVICE_ACCOUNT_EMAIL / GA4_SERVICE_ACCOUNT_PRIVATE_KEY não configuradas')
    }

    const now = Math.floor(Date.now() / 1000)
    const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
    const claim = base64url(JSON.stringify({
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    }))
    const signInput = `${header}.${claim}`
    const signer = createSign('RSA-SHA256')
    signer.update(signInput)
    signer.end()
    const signature = base64url(signer.sign(privateKey))
    const jwt = `${signInput}.${signature}`

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt,
        }),
    })
    if (!res.ok) {
        throw new Error(`Falha ao obter access_token do Google: ${res.status} ${await res.text()}`)
    }
    const data = await res.json()
    return data.access_token
}

export async function runGa4Report(accessToken: string, propertyId: string, body: Record<string, unknown>) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    )
    if (!res.ok) {
        throw new Error(`Falha na GA4 Data API: ${res.status} ${await res.text()}`)
    }
    return res.json()
}
