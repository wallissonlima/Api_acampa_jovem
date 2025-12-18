import { Test, TestingModule } from '@nestjs/testing';
import { LimiteInscricaoService } from './limite-inscricao.service';

describe('LimiteInscricaoService', () => {
  let service: LimiteInscricaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LimiteInscricaoService],
    }).compile();

    service = module.get<LimiteInscricaoService>(LimiteInscricaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
