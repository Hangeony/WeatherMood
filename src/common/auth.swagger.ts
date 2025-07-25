import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const SwaggerSignup = {
  operation: ApiOperation({ summary: '회원가입' }),
  response201: ApiResponse({ status: 201, description: '회원가입 성공' }),
  response422: ApiResponse({ status: 422, description: '유효성 검사 실패' }),
};
