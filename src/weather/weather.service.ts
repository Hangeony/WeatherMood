import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '../../prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // ✅ RxJS observable → promise로 변환
import axios from 'axios';

@Injectable()
export class WeatherService {
  constructor(private readonly http: HttpService) {}

  async searchLocation(cityName: string) {
    const response = await firstValueFrom(
      this.http.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: cityName,
          limit: 1,
          appid: process.env.OPENWEATHER_API_KEY,
        },
      })
    );

    const data = response.data;

    if (!data || data.length === 0) {
      throw new BadRequestException('도시를 찾을 수 없습니다.');
    }

    const location = data[0];

    const searchLocation = location.local_names?.ko ?? location.name;

    return searchLocation;
  }

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
      date,
      location: {
        location: user.cityName,
      },
      weather: {
        temperature: res.data.main.temp,
        feels_like: res.data.main.feels_like,
        main: res.data.weather[0].main,
        description: res.data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`,
      },
    };
  }
}
