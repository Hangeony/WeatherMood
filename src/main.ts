import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 모든 API에 /api/v1 붙이기
  app.setGlobalPrefix('api/v1');

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
