import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { WeatherModule } from '../weather/weather.module';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
  imports: [WeatherModule],
})
export class MemoModule {}
