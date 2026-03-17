import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: { origin: "*" }
})
export class KitchenGateway {
  @WebSocketServer()
  server: Server

  sendNewOrder(order: any) {
    this.server.emit("kitchen:new-order", order)
  }
}