# ---- deps ----
FROM node:20-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---- builder ----
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# API_URL chỉ dùng ở Server Component (không có prefix NEXT_PUBLIC_) nên
# không cần truyền lúc build - đọc thẳng từ biến môi trường ở runtime.
RUN npm run build

# ---- runner ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
