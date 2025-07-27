import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignupResponseDto } from '../auth/dto/signup.response';

export const SwaggerSignup = {
  operation: ApiOperation({ summary: '회원가입' }),
  response201: ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: SignupResponseDto,
  }),
  response422: ApiResponse({
    status: 422,
    description: '유효성 검사 실패',
  }),
    response500: ApiResponse({
    status: 500,
    description: '서버 에러',
  }),
};
