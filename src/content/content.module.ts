import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [ContentService, PrismaService],
  controllers: [ContentController],
  exports: [ContentService],
})
export class ContentModule {}
