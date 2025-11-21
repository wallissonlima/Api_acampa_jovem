import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Isso torna o serviço disponível em todos os módulos automaticamente
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
