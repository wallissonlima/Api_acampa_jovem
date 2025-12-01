import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentosController } from './depoimentos.controller';

describe('DepoimentosController', () => {
  let controller: DepoimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepoimentosController],
    }).compile();

    controller = module.get<DepoimentosController>(DepoimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
