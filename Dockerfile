FROM node:18-slim

WORKDIR /usr/local/app

RUN npm i -g nx

COPY . .

RUN npm install --production
RUN npm i @nrwl/js

RUN nx run-many --target=build --configuration=production