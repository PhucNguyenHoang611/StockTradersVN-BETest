import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*"
  },
  namespace: "ws-stock"
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private _logger = new Logger("StockWebsocketGateway");
  private _activeUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    this._logger.verbose(
      "[Connected]:-------------⏫⏫⏫-------------: " + `[${client.id}]`
    );
  }

  handleDisconnect(client: any) {
    for (const [userId, clientId] of this._activeUsers.entries()) {
      if (clientId == client.id) {
        this._activeUsers.delete(userId);
        break;
      }
    }
    this._logger.verbose(
      "[Disconnected]:----------🌐🌐🌐-------------: " + `[${client.id}]`
    );
  }

  @SubscribeMessage("register")
  handleRegister(client: Socket, userId: string) {
    this._logger.verbose(
      "[Registered]:----------🚀🚀🚀-------------: " +
        `[${client.id}] - UserId:[${userId}]`
    );
    if (userId) {
      this._activeUsers.set(userId, client.id);
    }
  }

  // Send stock data to the client that is connected to the websocket server
  async handleStockData(data: any) {
    this.server.emit("STOCK_UPDATED", data);
  }
}
