import { Test, TestingModule } from '@nestjs/testing';
import { LimiteInscricaoController } from './limite-inscricao.controller';

describe('LimiteInscricaoController', () => {
  let controller: LimiteInscricaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LimiteInscricaoController],
    }).compile();

    controller = module.get<LimiteInscricaoController>(LimiteInscricaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
