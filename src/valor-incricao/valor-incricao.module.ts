import { Module } from '@nestjs/common';
import { ValorIncricaoController } from './valor-incricao.controller';
import { ValorIncricaoService } from './valor-incricao.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ValorIncricaoController],
  providers: [ValorIncricaoService, PrismaService],
})
export class ValorIncricaoModule {}
