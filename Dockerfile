FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache git openssh

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY yarn.lock ./
COPY package.json ./

RUN yarn install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ENV NEXT_PUBLIC_CANDY_MACHINE_ID 'GQR444DK3xg4MjhZPqiwaGkY9kb6QQJg5FbDR9ZTdSqZ'
ENV NEXT_PUBLIC_RPC_HOST 'https://solana-mainnet.g.alchemy.com/v2/J8GsqmgI11EZWDlFdGEKLTg2d-mYCRju/'
ENV NEXT_PUBLIC_SOLANA_NETWORK 'mainnet-beta'


RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80


ENV PORT 80

ENV NEXT_PUBLIC_CANDY_MACHINE_ID 'GQR444DK3xg4MjhZPqiwaGkY9kb6QQJg5FbDR9ZTdSqZ'
ENV NEXT_PUBLIC_RPC_HOST 'https://solana-mainnet.g.alchemy.com/v2/J8GsqmgI11EZWDlFdGEKLTg2d-mYCRju/'
ENV NEXT_PUBLIC_SOLANA_NETWORK 'mainnet-beta'


CMD ["node", "server.js"]
