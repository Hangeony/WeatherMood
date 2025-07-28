import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const SwaggerGetWeatherToday = {
  operation: ApiOperation({ summary: '오늘의 날씨 조회' }),
  response200: ApiResponse({
    status: 200,
    description: '날씨 정보 조회 성공',
    schema: {
      example: {
        city: 'Seoul',
        date: '2025-07-28',
        location: 'Seoul',
        weather: 'Clear',
        description: '맑음',
        temp: 30.5,
        feels_like: 32.1,
        icon: 'https://openweathermap.org/img/wn/01d.png',
      },
    },
  }),
  response400: ApiResponse({
    status: 400,
    description: '오늘 외의 날짜는 현재 지원되지 않습니다.',
  }),
  response404: ApiResponse({
    status: 404,
    description: '사용자의 위치 정보가 없습니다.',
  }),
  response500: ApiResponse({
    status: 500,
    description: '서버 에러',
  }),
};

export const SwaggerGetWeatherByDate = {
  operation: ApiOperation({ summary: '특정 날짜의 날씨 조회' }),
  response200: ApiResponse({
    status: 200,
    description: '날씨 정보 조회 성공',
    schema: {
      example: {
        city: 'Seoul',
        date: '2025-07-28',
        location: 'Seoul',
        weather: 'Clouds',
        description: '흐림',
        temp: 28.1,
        feels_like: 30.0,
        icon: 'https://openweathermap.org/img/wn/03d.png',
      },
    },
  }),
  response400: ApiResponse({
    status: 400,
    description: '오늘 외의 날짜는 현재 지원되지 않습니다.',
  }),
  response404: ApiResponse({
    status: 404,
    description: '사용자의 위치 정보가 없습니다.',
  }),
  response500: ApiResponse({
    status: 500,
    description: '서버 에러',
  }),
};
