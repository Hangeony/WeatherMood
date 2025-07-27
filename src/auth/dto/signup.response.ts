import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @ApiProperty({ example: '건희' })
  nickName: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: '123456' })
  confirm_password: string;

  @ApiProperty({ example: 'Seoul' })
  cityName: string;
}
