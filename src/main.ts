import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // 모든 API에 /api/v1 붙이기
  app.setGlobalPrefix('api/v1');

  setupSwagger(app);

  app.enableCors({
    // origin: 'http://localhost:5173', // 로컬 개발시 사용
    origin: 'https://weather-mood-six.vercel.app', // 실제 프론트 주소로 변경
    // 프론트 주소
    credentials: true, // 쿠키/헤더 등 포함시 필요
  });

  await app.listen(3000);
  console.log('서버 실행중 ~ 😀');
}
bootstrap();
