import { Test, TestingModule } from '@nestjs/testing';
import { FormularioServosController } from './formulario-servos.controller';

describe('FormularioServosController', () => {
  let controller: FormularioServosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormularioServosController],
    }).compile();

    controller = module.get<FormularioServosController>(FormularioServosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
