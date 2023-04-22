FROM node:16-alpine AS builder

WORKDIR /usr

COPY . .

RUN npm install

FROM node:16-alpine AS final

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --only=production

EXPOSE 80

CMD [ "npm", "run", "start" ]