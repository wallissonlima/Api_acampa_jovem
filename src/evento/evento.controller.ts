import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EventosService } from './evento.service';
import { UploadEventoDto } from '../content/dto/update-content.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Eventos') // 👈 organiza no Swagger
@ApiBearerAuth('access-token') // 👈 ativa cadeado 🔒
@Controller('eventos')
export class EventosController {
  constructor(private service: EventosService) {}

  @Public()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post('upload')
  async uploadEvento(@Body() body: UploadEventoDto) {
    // body.base64 expected WITHOUT data: prefix (just raw base64)
    const { base64, fileType } = body;

    let imagemDataUri: string | undefined = undefined;
    if (base64 && fileType) {
      imagemDataUri = `data:${fileType};base64,${base64}`;
    }

    return this.service.create({
      titulo: body.titulo,
      descricao: body.descricao,
      dataInicio: body.dataInicio,
      dataFim: body.dataFim,
      imagemDataUri,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
