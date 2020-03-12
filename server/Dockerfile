FROM node:12.13.0-slim

ARG version 
ENV VERSION $version
WORKDIR /app
COPY . .
WORKDIR /app/server
RUN yarn
RUN yarn build
COPY server/env ./env
EXPOSE 5000
CMD [ "yarn", "start" ]
