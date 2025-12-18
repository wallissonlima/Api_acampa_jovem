import { Module } from '@nestjs/common';
import { LimiteInscricaoController } from './limite-inscricao.controller';
import { LimiteInscricaoService } from './limite-inscricao.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [LimiteInscricaoController],
  providers: [LimiteInscricaoService, PrismaService],
  exports: [LimiteInscricaoService], // 👈 MUITO IMPORTANTE
})
export class LimiteInscricaoModule { }
