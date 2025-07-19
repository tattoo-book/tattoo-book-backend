FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json .
COPY dist ./dist
COPY node_modules ./node_modules

CMD ["node", "dist/main"]