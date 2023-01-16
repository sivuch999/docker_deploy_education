ARG NODE_VERSION=16.15.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/api
COPY . /usr/src/api

ENV DB_HOST=35.240.148.166
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=Tk~a-i4*N8n}aC5@
ENV DB_NAME=education_db

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "dev"]