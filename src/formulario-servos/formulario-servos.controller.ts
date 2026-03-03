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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Formulario Servos') // 👈 organiza no Swagger
@ApiBearerAuth('access-token') // 👈 ativa cadeado 🔒
@Controller('formularioServos')
export class FormularioServosController {
  constructor(
    private readonly formularioServosService: FormularioServosService,
  ) { }

  @Public()
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

  @Public()
  @Get('exists-cpf/:cpf')
  async existsCpf(@Param('cpf') cpf: string) {
    const exists = await this.formularioServosService.existsCpf(cpf);
    return { exists };
  }
}