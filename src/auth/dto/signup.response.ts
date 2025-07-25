import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @ApiProperty({ example: '건희' })
  nickName: string;

  @ApiProperty({ example: 'Seoul' })
  cityName: string;

  @ApiProperty({ example: 37.5665, description: '위도' })
  latitude: number;

  @ApiProperty({ example: 126.978, description: '경도' })
  longitude: number;
}
