FROM node:14-slim as build
WORKDIR /nest-sample
COPY package.json tsconfig.json *.env ./
RUN ["yarn"]
COPY src ./src
RUN ["yarn", "build"]