import { ConfigModule } from '@nestjs/config'; // ✅ importe aqui
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FormularioModule } from './formulario/formulario.module';
import { EventosModule } from './evento/evento.module';

import { MediaModule } from './media/media.module';
import { PrismaModule } from './database/database.module';
import { ContentModule } from './content/content.module';
import { TimelineModule } from './timeline/timeline.module';
import { DepoimentosModule } from './depoimentos/depoimentos.module';
import { CarouselModule } from './carousel/carousel.module';
import { PaymentsModule } from './payments/payments.module';
import { FormularioServosModule } from './formulario-servos/formulario-servos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ permite usar ConfigService em todos os módulos
    }),
    AuthModule,
    UserModule,
    FormularioModule,
    EventosModule,
    MediaModule,
    PrismaModule,
    ContentModule,
    TimelineModule,
    DepoimentosModule,
    CarouselModule,
    PaymentsModule,
    FormularioServosModule,
  ],
})
export class AppModule { }
