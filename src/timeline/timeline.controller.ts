import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Timeline') // 👈 organiza no Swagger
@ApiBearerAuth('access-token') // 👈 ativa cadeado 🔒
@Controller('timeline')
export class TimelineController {

    constructor(private service: TimelineService) { }

    @Public()
    @Get()
    getTimeline() {
        return this.service.get();
    }

    @Post()
    saveTimeline(@Body() body: any) {
        return this.service.save(body.eventDate, body.milestones); // << CORRETO ✔
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(Number(id));
    }
}
