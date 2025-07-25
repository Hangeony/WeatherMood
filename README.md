# 🌦️ Weather Mood API

NestJS + Prisma + Supabase + OpenWeatherMap API 기반 프로젝트 🌐

---

## 📦 NPM Scripts
명령어 설명

npm run start NestJS 앱 실행 (프로덕션)
npm run start:dev 개발 모드 실행 (저장 시 자동 리빌드)
npm run start:debug 디버그 모드 실행
npm run build NestJS 앱 빌드

## 🔧 Prisma
npm run db:migrate:dev 개발 환경 DB 마이그레이션
npm run db:push Prisma 스키마를 DB에 반영
npm run db:generate Prisma Client 코드 생성
npm run db:migrate:reset DB 초기화 및 마이그레이션 재적용
npm run db:studio Prisma Studio 실행 (웹 UI로 DB 관리)

## 🌐 Supabase
npm run supabase:init Supabase 프로젝트 초기화
npm run supabase:start Supabase 로컬 서비스 시작
npm run supabase:stop Supabase 로컬 서비스 종료

## 🌱 시드 데이터
npm run seed Prisma 시드 데이터 입력 (prisma/seed.ts 실행)

## 🧹 코드 관리
npm run format Prettier로 코드 포맷팅
npm run lint ESLint로 코드 린트 및 자동 수정

## 🧪 테스트
npm run test 테스트 실행
npm run test:watch 테스트 워치 모드 실행
npm run test:cov 테스트 커버리지 확인

---

## 📝 사용 기술 스택
NestJS: 서버 사이드 프레임워크

Prisma: ORM 및 DB 마이그레이션

Supabase: 인증 및 DB 관리

Swagger: API 문서 자동화

OpenWeatherMap API: 날씨 정보 제공
