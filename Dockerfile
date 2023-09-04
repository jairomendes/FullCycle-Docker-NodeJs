FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

COPY  . .

EXPOSE 8080

CMD [ "node", "app.js" ]