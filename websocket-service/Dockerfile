FROM node:18-alpine

WORKDIR /app/websocket-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8082

CMD ["npm", "run", "start:prod"]