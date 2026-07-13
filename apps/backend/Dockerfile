FROM node:20-slim

# Prisma engine cần openssl
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

# Áp migration mới nhất rồi mới chạy server, để không phải chạy tay khi deploy
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
