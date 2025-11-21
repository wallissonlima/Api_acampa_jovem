import { ConfigModule } from '@nestjs/config'; // ✅ importe aqui
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FormularioModule } from './formulario/formulario.module';
import { EventoModule } from './evento/evento.module';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ permite usar ConfigService em todos os módulos
    }),
    AuthModule,
    UserModule,
    FormularioModule,
    EventoModule,
    MediaModule,
    PrismaModule,
  ],
})
export class AppModule { }
