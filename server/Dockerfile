# build stage
FROM node:12.13.0 AS builder

WORKDIR /app

COPY . .

RUN yarn
RUN yarn clean
RUN yarn build

# run stage
FROM node:12.13.0-slim

WORKDIR /app

COPY package.json ./
RUN yarn
RUN npm install pm2 -g

COPY --from=builder /app/dist ./dist
COPY env ./env

EXPOSE 5000

CMD [ "pm2-runtime", "dist/index.js" ]
