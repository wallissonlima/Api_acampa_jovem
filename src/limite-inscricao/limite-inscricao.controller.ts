import { Body, Controller, Get, Put } from '@nestjs/common';
import { LimiteInscricaoService } from './limite-inscricao.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Limite de Inscricao') // 👈 organiza no Swagger
@ApiBearerAuth('access-token') // 👈 ativa cadeado 🔒
@Controller('limite-inscricao')
export class LimiteInscricaoController {
    constructor(
        private readonly limiteService: LimiteInscricaoService,
    ) { }

    @Public()
    @Get('status')
    status() {
        return this.limiteService.status();
    }

    @Put()
    atualizar(@Body() body: any) {
        return this.limiteService.atualizar(body);
    }
}
