import { Test, TestingModule } from '@nestjs/testing';
import { ValorIncricaoService } from './valor-incricao.service';

describe('ValorIncricaoService', () => {
  let service: ValorIncricaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorIncricaoService],
    }).compile();

    service = module.get<ValorIncricaoService>(ValorIncricaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
