import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando Swagger
  const config = new DocumentBuilder()
    .setTitle('Minha API REST')
    .setDescription('API exemplo com NestJS, Prisma e Swagger')
    .setVersion('1.0')
    .addBearerAuth() // caso queira JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
