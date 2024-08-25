FROM node:18-alpine

WORKDIR /app/api-gateway

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]