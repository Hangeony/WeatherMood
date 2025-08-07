import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    console.log('서버 헬스 체크 엔드포인트가 호출되었습니다.');
    return this.health.check([
      () =>
        this.http.pingCheck(
          'nestjs-docs',
          'https://weathermood-xn6f.onrender.com'
        ),
    ]);
  }
}
