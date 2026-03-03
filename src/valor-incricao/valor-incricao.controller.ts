import { Controller, Get, Put, Body } from '@nestjs/common';
import { ValorIncricaoService } from './valor-incricao.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Valor de Inscricao') // 👈 organiza no Swagger
@ApiBearerAuth('access-token') // 👈 ativa cadeado 🔒
@Controller('valor-incricao')
export class ValorIncricaoController {
    constructor(private readonly service: ValorIncricaoService) { }

    @Public()
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
