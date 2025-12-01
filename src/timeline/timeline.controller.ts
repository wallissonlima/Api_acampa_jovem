import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {

    constructor(private service: TimelineService) { }

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
