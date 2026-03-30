import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../database/prisma.service';
import { StatusPagamento } from '@prisma/client';

@Injectable()
export class MercadoPagoWebhookService {
  private readonly logger = new Logger(MercadoPagoWebhookService.name);
  private readonly accessToken = process.env.MP_ACCESS_TOKEN;

  constructor(private readonly prisma: PrismaService) {}

  async processNotification(input: any) {
    const paymentId =
      input.body?.data?.id ||
      input.body?.resource?.split('/').pop?.();

    if (!paymentId) {
      this.logger.warn('Webhook sem paymentId. Ignorando.');
      return;
    }

    const payment = await this.fetchPayment(paymentId);

    const externalReference = payment.external_reference as string | undefined;
    const mpStatus = payment.status as string | undefined;

    if (!externalReference) {
      this.logger.warn(`Pagamento ${paymentId} sem external_reference.`);
      return;
    }

    const [tipo, inscricaoIdRaw] = externalReference.split(':');
    const inscricaoId = Number(inscricaoIdRaw);

    if (!tipo || !inscricaoId || Number.isNaN(inscricaoId)) {
      this.logger.warn(`external_reference inválida: ${externalReference}`);
      return;
    }

    const statusPagamento = this.mapMercadoPagoStatus(mpStatus);

    if (tipo === 'SERVO') {
      await this.prisma.formularioServos.update({
        where: { id: inscricaoId },
        data: {
          statusPagamento,
        },
      });

      this.logger.log(`Servo ${inscricaoId} atualizado para ${statusPagamento}`);
      return;
    }

    if (tipo === 'PARTICIPANTE') {
      await this.prisma.formulario.update({
        where: { id: inscricaoId },
        data: {
          statusPagamento,
        },
      });

      this.logger.log(`Participante ${inscricaoId} atualizado para ${statusPagamento}`);
      return;
    }

    this.logger.warn(`Tipo desconhecido em external_reference: ${tipo}`);
  }

  private async fetchPayment(paymentId: string) {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return response.data;
  }

  private mapMercadoPagoStatus(status?: string): StatusPagamento {
    switch (status) {
      case 'approved':
        return StatusPagamento.APROVADO;

      case 'in_process':
      case 'pending':
        return StatusPagamento.EM_PROCESSAMENTO;

      case 'rejected':
      case 'cancelled':
      case 'refunded':
      case 'charged_back':
        return StatusPagamento.NAO_APROVADO;

      default:
        return StatusPagamento.EM_PROCESSAMENTO;
    }
  }
}