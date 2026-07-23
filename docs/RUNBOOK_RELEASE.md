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

1. Build or load the commit-tagged image. The build MUST pass the `NEXT_PUBLIC_*` tracking vars as build args — static pages (all `/lp/*`) are prerendered at build time and ship without Google/Meta tags if these are missing. On the VPS:

   ```bash
   set -a; source /opt/vps-bb/env/site-bb.env; set +a
   docker build \
     --build-arg NEXT_PUBLIC_GTM_ID="$NEXT_PUBLIC_GTM_ID" \
     --build-arg NEXT_PUBLIC_ADS_ID="$NEXT_PUBLIC_ADS_ID" \
     --build-arg NEXT_PUBLIC_GA_ID="$NEXT_PUBLIC_GA_ID" \
     --build-arg NEXT_PUBLIC_FB_PIXEL_ID="$NEXT_PUBLIC_FB_PIXEL_ID" \
     -t bnb-site:<short-sha> .
   ```
2. Update only `site-bb_app`.
3. Keep `site-bb_site-bb-postgres` and `site-bb_site-bb-redis` unchanged unless the release explicitly requires data work.
4. Watch rollout until `site-bb_app` is `1/1`.
5. Roll back to the previous image tag if the service fails, media breaks, or core routes return non-2xx.
6. Before changing the image, `deploy-vps.sh` verifies that the existing service spec contains `PAYLOAD_SECRET`, `BLOG_ENGINE_SECRET`, `REDIS_URL`, and the `bnb-platform_media_data -> /app/media` mount. Missing runtime state aborts before the update; the script never invents or prints secret values.
7. The script captures the current image, requests Swarm automatic rollback and `start-first` only when the installed Docker supports those flags, waits up to 150 seconds for convergence, and requires an HTTP smoke check. A failure triggers an explicit rollback within the shared 285-second release window.
8. Override `SMOKE_URL` only for an approved non-production endpoint. Do not increase `RELEASE_WINDOW_SECONDS=285` without approving a maintenance window longer than five minutes.

## Rollback

- Automatic trigger: rollout does not converge, Swarm pauses/rolls back, or the HTTP smoke fails.
- Explicit action: restore the exact image captured before `docker service update`, then wait for all desired replicas to converge.
- If explicit rollback or convergence fails, stop the release and perform immediate manual intervention; do not stack another image update.
- After service restoration, keep the failed image for diagnosis. Image cleanup runs only after successful convergence and smoke.

## Production Verification

- `https://bebiluminacao.com.br/` returns 200.
- `https://www.bebiluminacao.com.br/` returns 200.
- `/produtos`, `/blog`, `/representantes`, and `/downloads` return 200.
- A known media file loads through Payload.
- Tracking tags render on static LPs: `curl -s https://bebiluminacao.com.br/lp/pintura-eletrostatica | grep -c googletagmanager` returns >= 1.
- Representative lead capture UI renders; do not submit real leads without approval.
- Logs show no new critical errors during the first 15 minutes.
