import { Body, Controller, Headers, HttpCode, Post, Query } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { MercadoPagoWebhookService } from './mercadopago-webhook.service';

@Controller('webhook')
export class MercadoPagoWebhookController {
    constructor(
        private readonly mercadoPagoWebhookService: MercadoPagoWebhookService,
    ) { }

    @Public()
    @Post('mercadopago')
    @HttpCode(200)
    async handleWebhook(
        @Query('type') type?: string,
        @Query('topic') topic?: string,
        @Body() body?: any,
        @Headers() headers?: Record<string, string>,
    ) {
        await this.mercadoPagoWebhookService.processNotification({
            type,
            topic,
            body,
            headers,
        });

        return { ok: true };
    }
}