import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TimelineController],
  providers: [TimelineService, PrismaService]
})
export class TimelineModule {}
