FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY src ./src
COPY libs ./libs

EXPOSE 3000

CMD ["yarn", "dev"]