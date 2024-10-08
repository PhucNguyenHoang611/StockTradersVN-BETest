import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { WebsocketModule } from "./websocket/websocket.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WebsocketModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
