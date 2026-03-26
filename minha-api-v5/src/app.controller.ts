import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller() // Vazio para responder na raiz '/'
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
