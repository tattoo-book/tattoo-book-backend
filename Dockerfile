FROM node:20-alpine

WORKDIR /usr/app

COPY dist .
COPY node_modules .

CMD ['node', "dist/main"]