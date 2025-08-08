import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '../../prisma/client';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_ANON_KEY!
// );

@Injectable()
export class AuthService {
  async register(payload: RegisterDto) {
    const { email, password, nickName, cityName } = payload;

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

  async login(payload: LoginDto) {
    const { email, password } = payload;

    // 1. 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email },
      include: { account: true },
    });

    if (!user || !user.account?.password_hash) {
      throw new BadRequestException({
        errors: {
          email: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
      });
    }

    // 2. 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.account.password_hash);
    if (!isMatch) {
      throw new BadRequestException({
        errors: {
          email: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
      });
    }

    // 3. JWT 토큰 생성
    const JWTPayload = {
      id: user.id,
      email: user.email,
      nickName: user.nickName,
    };

    const accessToken = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    });

    // 4. refresh_token 업데이트
    await prisma.account.update({
      where: { userId: user.id },
      data: { refresh_token: refreshToken },
    });

    return {
      id: user.id,
      email: user.email,
      nickName: user.nickName,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    const account = await prisma.account.findUnique({
      where: { userId },
    });

    if (!account) {
      throw new BadRequestException('해당 계정이 존재하지 않습니다.');
    }

    await prisma.account.update({
      where: { id: account.id },
      data: { refresh_token: null },
    });

    return { message: '로그아웃 완료' };
  }
}
