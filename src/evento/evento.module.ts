import { Module } from '@nestjs/common';
import { EventosService } from './evento.service';
import { EventosController } from './evento.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [EventosController],
  providers: [EventosService, PrismaService],
  exports: [EventosService],
})
export class EventosModule {}
