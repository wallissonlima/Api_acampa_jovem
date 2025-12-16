import { Module } from '@nestjs/common';
import { FormularioServosController } from './formulario-servos.controller';
import { FormularioServosService } from './formulario-servos.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [FormularioServosController],
  providers: [FormularioServosService, PrismaService]
})
export class FormularioServosModule { }
