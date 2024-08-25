import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import { createKafkaConfig } from "./config/kafka.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  // Connect to Kafka Server
  app.connectMicroservice<MicroserviceOptions>(
    createKafkaConfig(configService)
  );

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`WebsocketService is running on: ${await app.getUrl()}`);
}
bootstrap();
