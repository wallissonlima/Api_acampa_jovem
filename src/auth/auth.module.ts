import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy'; // <--- IMPORTANTE
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [
    ConfigModule,

    // registra o passport usando jwt por padrão
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // configura o JWT via .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || 'default_secret',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,         // <--- ESSENCIAL, SENÃO O GUARD NÃO FUNCIONA
  ],
  exports: [
    JwtModule,
    AuthService,
    PassportModule,
    JwtStrategy,         // <--- EXPORTA PARA USAR NO CONTENT MODULE
  ],
})
export class AuthModule { }
