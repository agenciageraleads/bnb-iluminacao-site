# Estágio 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
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
