FROM node:20.5-alpine

WORKDIR /app

RUN apk --no-cache add chromium

COPY package*.json .

RUN npm install

COPY * .

CMD node webshot.js
