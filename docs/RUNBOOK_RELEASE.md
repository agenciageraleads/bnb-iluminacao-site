# Site B&B Release Runbook

Use this for releases to `bebiluminacao.com.br` and `www.bebiluminacao.com.br`.

## Release Rules

- Keep site releases independent from CRM releases unless the change is explicitly about the Site -> CRM lead handoff.
- Do not submit real contact/lead forms during validation unless a test window is approved.
- Use commit-tagged images such as `bnb-site:<short-sha>`.
- Treat `typescript.ignoreBuildErrors = true` as technical debt; releases still need a separate typecheck signal.

## Pre-Release

1. Classify the change: representatives/leads, Payload/content model, media, SEO/LP, Docker/runtime, or scripts.
2. Remove exploratory scripts and generated media from the release scope unless they are part of the intended delivery.
3. Run:
   - `npm run typecheck`;
   - `npm run lint`;
   - `npm run build`;
   - `npm run smoke:public`.
4. If Payload schema, media storage, or database shape changed, verify staging before production.

## Deploy

1. Build or load the commit-tagged image.
2. Update only `site-bb_app`.
3. Keep `site-bb_site-bb-postgres` and `site-bb_site-bb-redis` unchanged unless the release explicitly requires data work.
4. Watch rollout until `site-bb_app` is `1/1`.
5. Roll back to the previous image tag if the service fails, media breaks, or core routes return non-2xx.

## Production Verification

- `https://bebiluminacao.com.br/` returns 200.
- `https://www.bebiluminacao.com.br/` returns 200.
- `/produtos`, `/blog`, `/representantes`, and `/downloads` return 200.
- A known media file loads through Payload.
- Representative lead capture UI renders; do not submit real leads without approval.
- Logs show no new critical errors during the first 15 minutes.
