import { Test, TestingModule } from '@nestjs/testing';
import { FormularioServosService } from './formulario-servos.service';

describe('FormularioServosService', () => {
  let service: FormularioServosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormularioServosService],
    }).compile();

    service = module.get<FormularioServosService>(FormularioServosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
