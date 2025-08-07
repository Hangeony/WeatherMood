import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { prisma } from '../../prisma/client';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class MemoService {
  constructor(private readonly weatherService: WeatherService) {}

  async listMyMemos(userId: number) {
    return prisma.memos.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { Feeling: true },
    });
  }
  async getOne(userId: number, memoId: number) {
    const memo = await prisma.memos.findUnique({
      where: { id: memoId },
      include: { Feeling: true },
    });
    if (!memo) throw new NotFoundException('메모가 없습니다.');
    if (memo.userId !== userId)
      throw new ForbiddenException('권한이 없습니다.');
    return memo;
  }

  async getOneByDate(userId: number, date: string) {
    const memo = await prisma.memos.findUnique({
      where: { userId_date: { userId, date } },
      include: { Feeling: true },
    });
    if (!memo) throw new NotFoundException('해당 날짜의 메모가 없습니다.');
    return memo;
  }

  async create(userId: number, dto: CreateMemoDto) {
    const { location, date, memo, feelingId } = dto;
    const cityName = location;

    const exists = await prisma.memos.findUnique({
      where: { userId_date: { userId, date } },
    });
    if (exists) throw new ConflictException('이미 작성한 메모가 있습니다.');

    const weatherData = await this.weatherService.getWeather(userId, date);
    const { temperature, feels_like, main, description, icon } =
      weatherData.weather;

    return prisma.memos.create({
      data: {
        userId,
        cityName,
        date,
        memo,
        feelingId,
        temperature,
        feelsLike: feels_like,
        main,
        description,
        icon,
      },
    });
  }

  async update(userId: number, memoId: number, dto: UpdateMemoDto) {
    const memo = await prisma.memos.findUnique({ where: { id: memoId } });
    if (!memo) throw new NotFoundException('메모가 없습니다.');
    if (memo.userId !== userId)
      throw new ForbiddenException('권한이 없습니다.');

    return prisma.memos.update({
      where: { id: memoId },
      data: { ...dto, updatedAt: new Date() },
    });
  }

  async remove(userId: number, memoId: number) {
    const memo = await prisma.memos.findUnique({ where: { id: memoId } });
    if (!memo) throw new NotFoundException('메모가 없습니다.');
    if (memo.userId !== userId)
      throw new ForbiddenException('권한이 없습니다.');

    await prisma.memos.delete({ where: { id: memoId } });
    return { message: '삭제되었습니다.' };
  }
}
