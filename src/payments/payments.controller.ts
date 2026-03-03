import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Payments') // 👈 organiza no Swagger
@ApiBearerAuth('access-token') // 👈 ativa cadeado 🔒
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('pagamento')
  createPayment(
    @Body()
    body: { tipo: 'PARTICIPANTE' | 'SERVO' },
  ) {
    return this.paymentsService.createPayment(body.tipo);
  }
}
