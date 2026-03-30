import { Module } from '@nestjs/common';
import { MercadoPagoWebhookController } from './mercadopago-webhook.controller';
import { MercadoPagoWebhookService } from './mercadopago-webhook.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [MercadoPagoWebhookController],
  providers: [MercadoPagoWebhookService, PrismaService],
  exports: [MercadoPagoWebhookService],
})
export class MercadoPagoWebhookModule {}