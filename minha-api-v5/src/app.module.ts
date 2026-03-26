// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// 🔹 AppController
import { AppController } from './app.controller.js'

// 🔹 AppService
import { AppService } from './app.service.js'

// 🔹 Prisma
import { PrismaModule } from './prisma/prisma.module.js';

// 🔹 Módulos de recursos
import { ProductsModule } from './products/products.module.js';   // Products / Product
import { CategoryModule } from './category/category.module.js';   // Category
import { UserModule } from './user/user.module.js';               // User
import { PostModule } from './post/post.module.js';               // Post
import { TableModule } from './table/table.module.js';            // Table
import { OrderModule } from './order/order.module.js';            // Order / OrderItem
import { AdminModule } from './admin/admin.module.js';            // Admin

// 🔹 Módulo de Autenticação (Auth)
import { AuthModule } from './auth/auth.module.js';               // Auth (login, JWT, guards)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 🔹 Core
    PrismaModule,

    // 🔹 Recursos do schema
    ProductsModule,    // Product
    CategoryModule,    // Category
    UserModule,        // User
    PostModule,        // Post
    TableModule,       // Table
    OrderModule,       // Order / OrderItem
    AdminModule,       // Admin

    // 🔹 Autenticação
    AuthModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
