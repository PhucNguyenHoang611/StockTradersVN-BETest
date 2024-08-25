import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  const options = new DocumentBuilder()
    .setTitle("StockTraders Test API")
    .setDescription("The stock API documentation - By: Nguyen Hoang Phuc")
    .setVersion("1.0")
    .addTag("stocks")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
  console.log(`StockDataService is running on: ${await app.getUrl()}`);
}
bootstrap();
