import { Controller, Get, Put, Body } from '@nestjs/common';
import { ValorIncricaoService } from './valor-incricao.service';

@Controller('valor-incricao')
export class ValorIncricaoController {
    constructor(private readonly service: ValorIncricaoService) { }

    // 🔹 Buscar valores
    @Get()
    getValores() {
        return this.service.getValores();
    }

    // 🔹 Atualizar valores
    @Put()
    updateValores(
        @Body()
        body: {
            priceParticipante: number;
            priceServo: number;
        },
    ) {
        return this.service.updateValores(
            body.priceParticipante,
            body.priceServo,
        );
    }
}
