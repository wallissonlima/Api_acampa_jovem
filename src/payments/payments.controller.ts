import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

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
