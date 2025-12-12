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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.formularioService.delete(Number(id));
  }

  // NOVA ROTA PARA O FRONT VERIFICAR CPF
  @Get('exists-cpf/:cpf')
  async existsCpf(@Param('cpf') cpf: string) {
    const exists = await this.formularioService.existsCpf(cpf);
    return { exists };
  }
}
