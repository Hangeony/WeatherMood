import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/auth/dto/login.response';

export const SwaggerLogin = {
  operation: ApiOperation({ summary: '로그인' }),
  response200: ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: LoginResponseDto,
  }),
  response400: ApiResponse({
    status: 400,
    description: '이메일 또는 비밀번호 오류',
  }),
  response500: ApiResponse({
    status: 500,
    description: '서버 에러',
  }),
};
