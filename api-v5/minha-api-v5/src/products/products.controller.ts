// src/products/products.controller
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js'; // Removi o .js se estiver usando TS padrão
import { CreateProductDto } from './dto/create-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() data: CreateProductDto) {
    // Certifique-se de que o método no service se chama 'create' ou 'createProduct'
    return this.productsService.create(data); 
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.productsService.search(q);
  }
}