FROM node:18-alpine

WORKDIR /usr/src/app/stock-data-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["npm", "run", "start:prod"]