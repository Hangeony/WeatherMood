import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 모든 API에 /api/v1 붙이기
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
