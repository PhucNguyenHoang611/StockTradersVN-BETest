import { Injectable } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";

@Injectable()
export class WebsocketService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  async handleStockData(data: any) {
    this.websocketGateway.handleStockData(data);
  }
}
