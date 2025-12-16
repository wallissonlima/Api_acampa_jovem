import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { FormularioServosService } from './formulario-servos.service';
import { CreateFormularioServosDto } from './dto/create-formulario.dto';
import { FormularioServos, Prisma } from '@prisma/client';

@Controller('formularioServos')
export class FormularioServosController {
  constructor(
    private readonly formularioServosService: FormularioServosService,
  ) {}

  @Post()
  create(@Body() data: CreateFormularioServosDto): Promise<FormularioServos> {
    return this.formularioServosService.create(data);
  }

  @Get()
  findAll(): Promise<FormularioServos[]> {
    return this.formularioServosService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FormularioServos | null> {
    return this.formularioServosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.FormularioServosUpdateInput,
  ): Promise<FormularioServos> {
    return this.formularioServosService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.formularioServosService.delete(id);
  }
}
