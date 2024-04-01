# build step
FROM node:alpine AS builder
MAINTAINER Dung DUONG <dung.don.96@gmail.com>

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN mv entry.sh /

EXPOSE 3000

RUN chmod 764 /entry.sh

ENTRYPOINT "/entry.sh"
