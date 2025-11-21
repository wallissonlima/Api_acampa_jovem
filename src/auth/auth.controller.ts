import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const { token, user } = await this.authService.login(email, password);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
