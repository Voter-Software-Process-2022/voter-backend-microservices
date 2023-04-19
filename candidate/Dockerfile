FROM node:16-alpine AS builder

WORKDIR /usr

COPY package*.json ./

RUN npm install --only=production
COPY ./src ./src

CMD [ "npm", "run", "start" ]