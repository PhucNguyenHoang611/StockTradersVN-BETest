import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { WebsocketService } from "./websocket.service";

@Controller()
export class WebsocketController {
  constructor(private readonly websocketService: WebsocketService) {}

  // Listen to the "stock_data" event to receive stock data from the stock-data-service
  @EventPattern("stock_data")
  async handleStockData(data: any) {
    this.websocketService.handleStockData(data);
  }
}
