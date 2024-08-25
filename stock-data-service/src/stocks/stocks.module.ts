import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule } from "@nestjs/microservices";

import { createKafkaConfig } from "@/config/kafka.config";
import { StocksController } from "./stocks.controller";
import { StocksService } from "./stocks.service";
import { Stock, StockSchema } from "./schemas/stock.schema";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "WEBSOCKET_SERVICE",
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) =>
          createKafkaConfig(configService),
        inject: [ConfigService]
      }
    ]),
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    HttpModule
  ],
  controllers: [StocksController],
  providers: [StocksService]
})
export class StocksModule {}
