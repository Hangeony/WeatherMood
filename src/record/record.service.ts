import { Injectable } from '@nestjs/common';
import { parseISO, endOfMonth, format } from 'date-fns';
import { prisma } from '../../prisma/client';

@Injectable()
export class RecordService {
  async getSummaryAndEntries(
    userId: number,
    { month, start, end }: { month?: string; start?: string; end?: string }
  ) {
    let gte: string;
    let lte: string;

    if (month) {
      // month가 들어오면 해당 월의 시작과 끝 계산
      const from = `${month}-01`;
      const to = endOfMonth(parseISO(from)).toISOString().split('T')[0];
      gte = from;
      lte = to;
    } else if (start && end) {
      gte = start;
      lte = end;
    } else {
      throw new Error('month 또는 start~end 쿼리가 필요합니다.');
    }

    // 감정 메모 조회
    const memos = await prisma.memos.findMany({
      where: {
        userId,
        date: {
          gte,
          lte,
        },
        feelingId: { not: null },
      },
      include: { Feeling: true },
      orderBy: { date: 'asc' },
    });

    // 감정 카운트 (groupBy)
    const group = await prisma.memos.groupBy({
      by: ['feelingId'],
      where: {
        userId,
        date: { gte, lte },
        feelingId: { not: null },
      },
      _count: true,
    });

    // 감정 이름 매핑
    const feelingMap = await prisma.feelings.findMany();
    const idToName = Object.fromEntries(feelingMap.map(f => [f.id, f.name]));

    const feelingCounts = group.reduce(
      (acc, item) => {
        const name = idToName[item.feelingId ?? 0] || 'unknown';
        acc[name] = item._count;
        return acc;
      },
      {} as Record<string, number>
    );

    const mostFrequentFeeling =
      Object.entries(feelingCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'none';

    return {
      totalEntries: memos.length,
      mostFrequentFeeling,
      feelingCounts,
      dailyStats: memos.map(m => ({
        date: m.date,
        feeling: m.Feeling?.name || 'unknown',
      })),
      entries: memos.map(m => ({
        id: m.id,
        date: m.date,
        time: format(
          new Date(
            m.updatedAt.getTime() !== m.createdAt.getTime()
              ? m.updatedAt
              : m.createdAt
          ),
          'yyyy-MM-dd HH:mm'
        ),
        memo: m.memo,
        feeling: m.Feeling?.name || 'unknown',
        temperature: m.temperature,
        feelsLike: m.feelsLike,
        main: m.main,
        description: m.description,
        icon: m.icon,
        cityName: m.cityName,
      })),
    };
  }
}
