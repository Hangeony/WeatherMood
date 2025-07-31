import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
  imports: [HttpModule],
})
export class WeatherModule {}
