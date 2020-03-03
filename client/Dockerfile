# build environment
FROM node:12.13.0 as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
COPY .env ./
RUN yarn add react-scripts@3.3.0 -g
RUN yarn
RUN yarn build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
