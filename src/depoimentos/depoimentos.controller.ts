import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepoimentosService } from './depoimentos.service';

@Controller('depoimentos')
export class DepoimentosController {
    constructor(private service: DepoimentosService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    create(@Body('texto') texto: string) {
        return this.service.create(texto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body('texto') texto: string) {
        return this.service.update(Number(id), texto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(Number(id));
    }
}
