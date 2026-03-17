import { NestFactory } from '@nestjs/core'; // Adicione isso
import { AppModule } from './app.module';    // Adicione isso

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();