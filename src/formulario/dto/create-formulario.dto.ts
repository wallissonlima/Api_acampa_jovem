// src/formulario/dto/create-formulario.dto.ts
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateFormularioDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'Nome credencial é obrigatório' })
  nomeCredencial: string;

  @IsOptional()
  telefone?: string;

  @IsOptional()
  dataNascimento?: string;

  @IsOptional()
  nomeResponsavel?: string;

  @IsOptional()
  telefoneResponsavel?: string;

  @IsOptional()
  tamanhoCamiseta?: string;

  @IsOptional()
  autorizacaoImagem?: string;

  @IsOptional()
  alergiaRestricao?: string;

  @IsOptional()
  descricao?: string;
}
