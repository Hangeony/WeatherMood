import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from './dto/validation.pipe';
import { registerSchema, RegisterDto } from './dto/register.dto';
import { SwaggerSignup } from 'src/common/auth.swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SwaggerSignup.operation
  @SwaggerSignup.response201
  @SwaggerSignup.response422
  @UsePipes(new ZodValidationPipe(registerSchema))
  async signUp(@Body() body: RegisterDto) {
    return this.authService.signUp(body);
  }
}
