import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ContentService, PrismaService],
  controllers: [ContentController],
  exports: [ContentService],
})
export class ContentModule {}
