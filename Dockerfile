FROM node:10-jessie

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY server.js ./

EXPOSE 3003

CMD ["node", "server.js"]

