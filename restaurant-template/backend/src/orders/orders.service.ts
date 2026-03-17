import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { KitchenGateway } from '../websocket/kitchen.gateway'

const prisma = new PrismaClient()

@Injectable()
export class OrdersService {
  constructor(private kitchen: KitchenGateway) {}

  async create(data:any) {
    const order = await prisma.order.create({
      data: {
        tableId: data.tableId,
        status: "OPEN"
      }
    })
    this.kitchen.sendNewOrder(order)
    return order
  }
}