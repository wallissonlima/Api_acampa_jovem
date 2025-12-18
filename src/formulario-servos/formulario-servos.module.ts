import { Module } from '@nestjs/common';
import { FormularioServosController } from './formulario-servos.controller';
import { FormularioServosService } from './formulario-servos.service';
import { PrismaService } from 'src/database/prisma.service';
import { LimiteInscricaoService } from 'src/limite-inscricao/limite-inscricao.service';

@Module({
  controllers: [FormularioServosController],
  providers: [FormularioServosService, LimiteInscricaoService, PrismaService]
})
export class FormularioServosModule { }
