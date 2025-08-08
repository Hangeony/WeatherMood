import { Controller, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from './dto/validation.pipe';
import { registerSchema, RegisterDto } from './dto/register.dto';
import { loginSchema, LoginDto } from './dto/login.dto';
import { SwaggerRegister } from 'src/common/auth.swagger';
import { SwaggerLogin } from 'src/common/login.swagger';
import { AuthGuard } from './auth.guard';
import { User } from '../common/decorator/user.decorator';

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
    return this.authService.register(body);
  }

  @Post('login')
  @SwaggerLogin.operation
  @SwaggerLogin.response200
  @SwaggerLogin.response400
  @SwaggerLogin.response500
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@User('id') userId: number) {
    return this.authService.logout(userId);
  }

  @Post('refresh')
  async refreshToken(@User('id') userId: number) {
    return this.authService.refreshToken(userId);
  }
}
