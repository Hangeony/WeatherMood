import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '../../prisma/client';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

@Injectable()
export class AuthService {
  async signUp(body: {
    email: string;
    password: string;
    nickName: string;
    cityName: string;
  }) {
    const { email, password, nickName, cityName } = body;

    // 중복 이메일 검사
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException({
        errors: { email: '이미 사용 중인 이메일입니다.' },
      });
    }

    // // Supabase에 회원가입
    // const { data, error } = await supabase.auth.signUp({ email, password });
    // if (error || !data.user) {
    //   throw new BadRequestException(error?.message ?? '회원가입 실패');
    // }

    // 도시명 → 위도/경도 조회
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: cityName,
          limit: 1,
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    const geo = geoRes.data[0];
    if (!geo) throw new BadRequestException('도시를 찾을 수 없습니다.');

    // 비밀번호 해시
    const password_hash = await bcrypt.hash(password, 10);

    // DB 저장
    await prisma.user.create({
      data: {
        email,
        nickName,
        cityName,
        latitude: geo.lat,
        longitude: geo.lon,
        account: {
          create: {
            password_hash,
          },
        },
      },
    });

    return { message: '회원가입 성공' };
  }
}
