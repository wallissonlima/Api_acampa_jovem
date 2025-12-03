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
import { FormularioService } from './formulario.service';
import { Prisma, Formulario } from '@prisma/client';
import { CreateFormularioDto } from './dto/create-formulario.dto';

@Controller('formulario')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Post()
  create(@Body() data: CreateFormularioDto) {
    // Não precisa toISOString, a conversão é feita no service
    return this.formularioService.create(data);
  }

  @Get()
  findAll(): Promise<Formulario[]> {
    return this.formularioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Formulario | null> {
    return this.formularioService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.FormularioUpdateInput,
  ): Promise<Formulario> {
    return this.formularioService.update(id, data);
  }

  @Delete('all')
  async removeAll(): Promise<{ count: number }> {
    return this.formularioService.removeAll();
  }
}
