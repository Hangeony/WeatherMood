import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '../../prisma/client';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather(userId: number, date: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.latitude || !user.longitude) {
      throw new NotFoundException('사용자의 위치 정보가 없습니다.');
    }

    const today = new Date().toISOString().split('T')[0];
    if (date !== today) {
      throw new BadRequestException('현재는 오늘 날짜만 지원됩니다.');
    }

    const { latitude, longitude } = user;

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'kr',
        },
      }
    );

    return {
      city: user.cityName,
      date,
      location: user.cityName,
      weather: res.data.weather[0].main,
      description: res.data.weather[0].description,
      temp: res.data.main.temp,
      feels_like: res.data.main.feels_like,
      icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`,
    };
  }
}
