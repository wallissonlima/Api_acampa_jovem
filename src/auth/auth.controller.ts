import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔓 PÚBLICO
  @ApiBearerAuth('access-token')
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }

  // 🔓 PÚBLICO
  @Public()
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

  // 🔒 PROTEGIDO
  @ApiBearerAuth('access-token')
  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}