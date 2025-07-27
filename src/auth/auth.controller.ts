import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from './dto/validation.pipe';
import { registerSchema, RegisterDto } from './dto/register.dto';
import { loginSchema, LoginDto } from './dto/login.dto';
import { SwaggerRegister } from 'src/common/auth.swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SwaggerRegister.operation
  @SwaggerRegister.response201
  @SwaggerRegister.response422
  @SwaggerRegister.response500
  @UsePipes(new ZodValidationPipe(registerSchema))
  async signUp(@Body() body: RegisterDto) {
    return this.authService.signUp(body);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
