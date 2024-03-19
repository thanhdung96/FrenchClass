# build step
FROM node:alpine AS builder
MAINTAINER Dung DUONG <dung.don.96@gmail.com>

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# run step
FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/entry.sh /entry.sh

EXPOSE 3000

ENTRYPOINT "/entry.sh"
