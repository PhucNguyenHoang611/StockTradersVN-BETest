import { Injectable, NestMiddleware } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Handle requests to the stock-data-service and websocket-service
    if (
      req.url.startsWith("/ws-stock") ||
      req.url.startsWith("/socket.io/?EIO=4&transport=websocket")
    ) {
      createProxyMiddleware({
        target: "http://websocket-service:8082",
        ws: true,
        changeOrigin: true
      })(req, res, next);
    } else {
      createProxyMiddleware({
        target: "http://stock-data-service:8081",
        changeOrigin: true
      })(req, res, next);
    }
  }
}
