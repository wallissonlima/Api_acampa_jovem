import { Test, TestingModule } from '@nestjs/testing';
import { MercadopagoWebhookService } from './mercadopago-webhook.service';

describe('MercadopagoWebhookService', () => {
  let service: MercadopagoWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadopagoWebhookService],
    }).compile();

    service = module.get<MercadopagoWebhookService>(MercadopagoWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
