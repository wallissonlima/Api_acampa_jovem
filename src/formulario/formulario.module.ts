import { Module } from '@nestjs/common';
import { FormularioController } from './formulario.controller';
import { FormularioService } from './formulario.service';
import { PrismaService } from 'src/database/prisma.service';
import { LimiteInscricaoService } from 'src/limite-inscricao/limite-inscricao.service';

@Module({
  controllers: [FormularioController],
  providers: [FormularioService, LimiteInscricaoService, PrismaService]
})
export class FormularioModule { }
