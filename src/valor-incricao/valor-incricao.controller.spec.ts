import { Test, TestingModule } from '@nestjs/testing';
import { ValorIncricaoController } from './valor-incricao.controller';

describe('ValorIncricaoController', () => {
  let controller: ValorIncricaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorIncricaoController],
    }).compile();

    controller = module.get<ValorIncricaoController>(ValorIncricaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
