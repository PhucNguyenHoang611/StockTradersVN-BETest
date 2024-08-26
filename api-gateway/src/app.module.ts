import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ProxyMiddleware } from "./config/proxy.config";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyMiddleware)
      .exclude({
        path: "health-check",
        method: RequestMethod.ALL
      })
      .forRoutes({
        path: "*",
        method: RequestMethod.ALL
      });
  }
}
