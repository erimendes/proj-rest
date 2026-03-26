import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Minha API Rest',
      version: '1.0.0',
      description: 'API de gerenciamento de pedidos e usuários',
      status: 'online',
      timestamp: new Date().toISOString()
    };
  }
}
