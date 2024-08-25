FROM node:18-alpine

WORKDIR /app/api-gateway
COPY api-gateway/package*.json ./
RUN npm install
COPY api-gateway/. .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start:prod"]

WORKDIR /app/stock-data-service
COPY stock-data-service/package*.json ./
RUN npm install
COPY stock-data-service/. .
RUN npm run build
EXPOSE 8081
CMD ["npm", "run", "start:prod"]

WORKDIR /app/websocket-service
COPY websocket-service/package*.json ./
RUN npm install
COPY websocket-service/. .
RUN npm run build
EXPOSE 8082
CMD ["npm", "run", "start:prod"]