import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from './dto/validation.pipe';
import { registerSchema, RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async signUp(@Body() body: RegisterDto) {
    return this.authService.signUp(body);
  }
}