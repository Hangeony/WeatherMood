import { PrismaClient } from '@prisma/client';
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

main()
  .then(() => {
    console.log('Seed 완료');
    return prisma.$disconnect();
  })
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
