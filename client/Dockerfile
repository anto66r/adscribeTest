# build environment
FROM node:12.13.0 as build
WORKDIR /app
COPY . .
WORKDIR /app/client
ARG version 
ARG theme 
ENV REACT_APP_VERSION $version
RUN yarn add react-scripts@3.3.0 -g
RUN yarn
RUN if [ "x$theme" = "x" ] ; then yarn build ; else yarn build:theme:$theme ; fi

# production  environment
FROM nginx:1.16.0-alpine
WORKDIR /app
COPY --from=build /app/client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
