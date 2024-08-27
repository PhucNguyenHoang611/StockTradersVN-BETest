import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT") || 8081;

  const options = new DocumentBuilder()
    .setTitle("StockTraders Test API")
    .setDescription("The stock API documentation - By: Nguyen Hoang Phuc")
    .setVersion("1.0")
    .addTag("stocks")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204
  });

  await app.listen(port);
  console.log(`StockDataService is running on: ${await app.getUrl()}`);
}
bootstrap();
