import { Module } from '@nestjs/common';
import { FormularioController } from './formulario.controller';
import { FormularioService } from './formulario.service';

@Module({
  controllers: [FormularioController],
  providers: [FormularioService]
})
export class FormularioModule {}
