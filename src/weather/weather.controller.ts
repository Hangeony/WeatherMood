import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../../src/common/decorator/user.decorator';
import { SwaggerGetWeatherToday } from 'src/common/weather.swagger';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('search')
  async searchLocation(@Query('q') cityName: string) {
    return this.weatherService.searchLocation(cityName);
  }

  @Get('today')
  @UseGuards(AuthGuard)
  @SwaggerGetWeatherToday.operation
  @SwaggerGetWeatherToday.response200
  @SwaggerGetWeatherToday.response400
  @SwaggerGetWeatherToday.response404
  @SwaggerGetWeatherToday.response500
  async getToday(@User('id') userId: number) {
    const date = this.getTodayDate();
    return this.weatherService.getWeather(userId, date);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getWeatherByDate(
    @User('id') userId: number,
    @Query('date') date: string
  ) {
    return this.weatherService.getWeather(userId, date);
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0]; // yyyy-MM-dd
  }
}
