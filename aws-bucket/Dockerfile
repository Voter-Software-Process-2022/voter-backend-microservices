FROM node:16-alpine AS builder

WORKDIR /usr

COPY . .

RUN npm install
RUN npm run build

FROM node:16-alpine AS final

WORKDIR /app

COPY --from=builder ./usr/dist ./dist
COPY package.json .
COPY package-lock.json .
RUN npm install --only=production

EXPOSE 80

CMD [ "npm", "run", "start" ]