import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, signUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: signUpDTO) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  async login(@Body() dto: loginDTO, @Res({ passthrough: true }) response) {
    return this.authService.login(dto, response);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.clearCookie('token');

    return {
      message: 'success',
    };
  }
}
