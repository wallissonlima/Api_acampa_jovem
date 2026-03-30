import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Payments')
@ApiBearerAuth('access-token')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Public()
  @Post('pagamento')
  createPayment(
    @Body()
    body: {
      inscricaoId: number;
    },
  ) {
    console.log('BODY PAGAMENTO:', body);
    return this.paymentsService.createPayment(Number(body.inscricaoId));
  }
}