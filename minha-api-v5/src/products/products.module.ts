import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService], // Adicione o PrismaService aqui
})
export class ProductsModule {}
