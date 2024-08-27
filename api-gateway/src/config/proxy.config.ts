/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createProxyMiddleware } from "http-proxy-middleware";

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    let bodyData;
    if (req.body) bodyData = JSON.stringify(req.body);

    // Handle requests to the stock-data-service and websocket-service
    if (
      !req.url.startsWith("/health-check") &&
      (req.url.startsWith("/ws-stock") ||
        req.url.startsWith("/socket.io/?EIO=4&transport=websocket"))
    ) {
      createProxyMiddleware({
        target:
          this.configService.get("WEBSOCKET_SERVICE_URL") ||
          "http://websocket-service:8082",
        ws: true,
        changeOrigin: true
      })(req, res, next);
    } else {
      createProxyMiddleware({
        target:
          this.configService.get("STOCK_DATA_SERVICE_URL") ||
          "http://stock-data-service:8081",
        changeOrigin: true,
        on: {
          proxyReq: (proxyReq, req, res) => {
            if (bodyData) {
              req.headers["content-type"] = "application/json";
              proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
              proxyReq.write(bodyData);
            }
          }
        }
      })(req, res, next);
    }
  }
}
