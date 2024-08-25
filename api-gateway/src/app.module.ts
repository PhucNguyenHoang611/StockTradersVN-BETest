import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ProxyMiddleware } from "./config/proxy.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProxyMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}
