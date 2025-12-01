import { Module } from '@nestjs/common';
import { DepoimentosController } from './depoimentos.controller';
import { DepoimentosService } from './depoimentos.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [DepoimentosController],
  providers: [DepoimentosService, PrismaService]
})
export class DepoimentosModule {}
