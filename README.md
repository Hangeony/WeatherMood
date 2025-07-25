# 🌦️ Weather Mood API

NestJS + Prisma + Supabase + OpenWeatherMap API 기반 날씨 기반 감정 기록 프로젝트입니다.  
날씨 데이터를 기반으로 사용자의 감정 상태를 기록하고 분석하는 API 서버입니다.

---

## 🛠️ 사용 기술 스택 및 모듈

| 기술/모듈                                                                                                                                  | 설명                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| <img src="https://nestjs.com/img/logo-small.svg" width="20"/> **NestJS**                                                                   | 타입 기반 백엔드 프레임워크           |
| <img src="https://www.prisma.io/icons/favicon-32x32.png" width="20"/> **Prisma**                                                           | Type-safe ORM 및 마이그레이션 도구    |
| <img src="https://supabase.com/favicon.ico" width="20"/> **Supabase**                                                                      | 인증 및 PostgreSQL 기반 백엔드 플랫폼 |
| <img src="https://swagger.io/favicon-32x32.png" width="20"/> **Swagger**                                                                   | API 문서 자동화 도구                  |
| <img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png" width="20"/> **OpenWeatherMap API** | 실시간 날씨 데이터 제공 외부 API      |

---

## 📦 NPM Scripts

### 기본 실행

```bash
npm run start         # NestJS 프로덕션 실행
npm run start:dev     # 개발 모드 (Hot Reload)
npm run start:debug   # 디버그 모드
npm run build         # NestJS 빌드
```

### 🔧Prisma (DB 관련)

```
npm run db:migrate:dev   # 개발용 마이그레이션 적용
npm run db:push          # Prisma 스키마 → DB 동기화
npm run db:generate      # Prisma Client 생성
npm run db:migrate:reset # DB 초기화 및 재마이그레이션
npm run db:studio        # 웹 UI로 DB 확인 (Prisma Studio)
```

### 🌐 Supabase (로컬 개발용)

```
npm run supabase:init    # Supabase 프로젝트 초기화
npm run supabase:start   # Supabase 로컬 서버 시작
npm run supabase:stop    # Supabase 로컬 서버 중지
```

### 🌱 시드 데이터

```
npm run seed             # Prisma 시드 데이터 입력 (prisma/seed.ts)
```

### 🧹 코드 스타일

```
npm run format           # Prettier 코드 포맷팅
npm run lint             # ESLint 린팅 및 자동 수정
```

### 🧪 테스트

```
npm run test             # 전체 테스트 실행
npm run test:watch       # 테스트 워치 모드
npm run test:cov         # 테스트 커버리지 확인
```

### 📁 프로젝트 구조 (예시)
```
src/
├── app.module.ts
├── main.ts
├── modules/
│ ├── auth/
│ ├── weather/
│ ├── mood/
│ └── user/
├── common/
│ ├── filters/
│ ├── guards/
│ └── interceptors/
└── prisma/
└── prisma.service.ts
```

### 📌 주요 기능 요약
✅ 회원가입 및 로그인 (Supabase 인증 활용)

🌤️ 도시명 기반 날씨 정보 조회 (OpenWeatherMap API 연동)

✍️ 감정 기록 및 상태 관리

📊 감정 변화 통계 제공 예정

🧾 Swagger 기반 API 문서 자동 생성
