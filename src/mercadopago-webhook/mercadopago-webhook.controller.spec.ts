import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoWebhookController } from './mercadopago-webhook.controller';

describe('MercadopagoWebhookController', () => {
  let controller: MercadoPagoWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadoPagoWebhookController],
    }).compile();

    controller = module.get<MercadoPagoWebhookController>(MercadoPagoWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
