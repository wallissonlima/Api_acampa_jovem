import { Body, Controller, Get, Put } from '@nestjs/common';
import { LimiteInscricaoService } from './limite-inscricao.service';

@Controller('limite-inscricao')
export class LimiteInscricaoController {
    constructor(
        private readonly limiteService: LimiteInscricaoService,
    ) { }

    @Get('status')
    status() {
        return this.limiteService.status();
    }

    @Put()
    atualizar(@Body() body: any) {
        return this.limiteService.atualizar(body);
    }
}
