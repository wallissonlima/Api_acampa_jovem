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
    this.logger.log('=== WEBHOOK START ===');
    this.logger.log(`INPUT: ${JSON.stringify(input)}`);

    const topic = input.type || input.topic || input.body?.topic;
    const resourceId =
      input.body?.data?.id ||
      input.body?.id ||
      input.body?.resource?.split('/').pop?.();

    this.logger.log(`TOPIC RECEBIDO: ${topic}`);
    this.logger.log(`RESOURCE ID RECEBIDO: ${resourceId}`);

    if (!topic || !resourceId) {
      this.logger.warn('Webhook sem topic ou resourceId. Ignorando.');
      return;
    }

    let payment: any = null;

    if (topic === 'payment') {
      this.logger.log(`BUSCANDO PAYMENT MP: ${resourceId}`);
      payment = await this.fetchPayment(String(resourceId));
    } else if (topic === 'merchant_order') {
      this.logger.log(`BUSCANDO MERCHANT ORDER MP: ${resourceId}`);

      const merchantOrder = await this.fetchMerchantOrder(String(resourceId));

      this.logger.log(`MERCHANT ORDER: ${JSON.stringify(merchantOrder)}`);

      const paymentId = merchantOrder?.payments?.[0]?.id;

      if (!paymentId) {
        this.logger.warn(
          `Merchant order ${resourceId} sem payments[0].id. Ignorando.`,
        );
        return;
      }

      this.logger.log(`PAYMENT ID EXTRAIDO DO MERCHANT ORDER: ${paymentId}`);

      payment = await this.fetchPayment(String(paymentId));
    } else {
      this.logger.warn(`Topic não tratado: ${topic}`);
      return;
    }

    if (!payment) {
      this.logger.warn('Pagamento não encontrado após processamento.');
      return;
    }

    this.logger.log(`PAYMENT MP: ${JSON.stringify(payment)}`);

    const externalReference = payment.external_reference as string | undefined;
    const mpStatus = payment.status as string | undefined;

    this.logger.log(`EXTERNAL_REFERENCE: ${externalReference}`);
    this.logger.log(`MP_STATUS: ${mpStatus}`);

    if (!externalReference) {
      this.logger.warn(`Pagamento ${payment.id} sem external_reference.`);
      return;
    }

    const [tipo, inscricaoIdRaw] = externalReference.split(':');
    const inscricaoId = Number(inscricaoIdRaw);

    this.logger.log(`TIPO EXTRAIDO: ${tipo}`);
    this.logger.log(`INSCRICAO ID EXTRAIDO: ${inscricaoId}`);

    if (!tipo || !inscricaoId || Number.isNaN(inscricaoId)) {
      this.logger.warn(`external_reference inválida: ${externalReference}`);
      return;
    }

    const statusPagamento = this.mapMercadoPagoStatus(mpStatus);

    this.logger.log(`STATUS MAPEADO: ${statusPagamento}`);

    if (tipo === 'SERVO') {
      const servo = await this.prisma.formularioServos.findUnique({
        where: { id: inscricaoId },
      });

      this.logger.log(`SERVO ENCONTRADO: ${JSON.stringify(servo)}`);

      if (!servo) {
        this.logger.warn(`Registro SERVO não encontrado para id ${inscricaoId}`);
        return;
      }

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
      const participante = await this.prisma.formulario.findUnique({
        where: { id: inscricaoId },
      });

      this.logger.log(
        `PARTICIPANTE ENCONTRADO: ${JSON.stringify(participante)}`,
      );

      if (!participante) {
        this.logger.warn(
          `Registro PARTICIPANTE não encontrado para id ${inscricaoId}`,
        );
        return;
      }

      await this.prisma.formulario.update({
        where: { id: inscricaoId },
        data: {
          statusPagamento,
        },
      });

      this.logger.log(
        `Participante ${inscricaoId} atualizado para ${statusPagamento}`,
      );
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

  private async fetchMerchantOrder(merchantOrderId: string) {
    const response = await axios.get(
      `https://api.mercadopago.com/merchant_orders/${merchantOrderId}`,
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