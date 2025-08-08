import { PrismaClient } from '@prisma/client';
import { addDays, format } from 'date-fns';
const prisma = new PrismaClient();

async function main() {
  await prisma.feelings.createMany({
    data: [
      { name: 'Sad' },
      { name: 'Angry' },
      { name: 'So-so' },
      { name: 'Smile' },
      { name: 'Happy' },
      { name: 'Excited' },
    ],
    skipDuplicates: true,
  });

  console.log('Feelings Data 생성 완료');
}

// 메모 더미 데이터 생성
const startDate = new Date('2025-07-01');
const endDate = new Date('2025-08-06');
const seedData: {
  userId: number;
  cityName: string;
  temperature: number;
  feelsLike: number;
  main: string;
  description: string;
  icon: string;
  date: string;
  memo: string;
  feelingId: number;
  createdAt: Date;
}[] = [];
let currentDate = startDate;

const weatherMain = ['Clear', 'Clouds', 'Rain', 'Thunderstorm', 'Snow'];
const weatherDesc = ['맑음', '구름많음', '비', '천둥번개', '눈'];

async function seedMemos() {
  while (currentDate <= endDate) {
    const feeelingId = Math.floor(Math.random() * 6) + 1; // 1부터 6까지 랜덤

    const wIndex = Math.floor(Math.random() * weatherMain.length);
    seedData.push({
      userId: 1,
      cityName: '서울',
      temperature: Number((Math.random() * 10 + 20).toFixed(2)),
      feelsLike: Number((Math.random() * 10 + 22).toFixed(2)),
      main: weatherMain[wIndex],
      description: weatherDesc[wIndex],
      icon: `https://openweathermap.org/img/wn/0${wIndex + 1}d.png`,
      date: currentDate.toISOString().split('T')[0],
      memo: `${weatherDesc[wIndex]} 날씨에 느낀 하루`,
      feelingId: feeelingId,
      createdAt: new Date(currentDate),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  await prisma.memos.deleteMany({});
  await prisma.memos.createMany({ data: seedData });
  console.log(`${seedData.length}개의 메모 더미 데이터 생성 완료`);
  console.log('더미 데이터 예시:', seedData[0]);
}

async function run() {
  await main();
  await seedMemos();
  console.log('Seed 완료');
  await prisma.$disconnect();
}

run().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
