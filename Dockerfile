# Estágio 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG PAYLOAD_NO_PUSH=true
ENV PAYLOAD_NO_PUSH=${PAYLOAD_NO_PUSH}
# NEXT_PUBLIC_* precisam existir no build: paginas estaticas (LPs) sao
# pre-renderizadas aqui e ficam sem tags se as vars chegarem so em runtime
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_ADS_ID
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_FB_PIXEL_ID
ENV NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID} \
    NEXT_PUBLIC_ADS_ID=${NEXT_PUBLIC_ADS_ID} \
    NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID} \
    NEXT_PUBLIC_FB_PIXEL_ID=${NEXT_PUBLIC_FB_PIXEL_ID}
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
# Payload loads its config while Next.js compiles. This non-secret marker only
# exists for this process; production must inject the real secret at runtime.
RUN PAYLOAD_SECRET=build-time-placeholder-not-for-runtime npm run build
RUN npm prune --omit=dev --legacy-peer-deps

# Estágio 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/payload.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 9010
CMD ["npm", "start"]
