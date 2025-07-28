import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../prisma/client';

@Injectable()
export class ProfileService {
  async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }
    
    return {
      email: user.email,
      nickName: user.nickName,
      cityName: user.cityName,
    };
  }
}
