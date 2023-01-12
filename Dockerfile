ARG NODE_VERSION=16.15.0

FROM node:${NODE_VERSION}-alpine as test

WORKDIR /usr/src/api
COPY . /usr/src/api

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "dev"]