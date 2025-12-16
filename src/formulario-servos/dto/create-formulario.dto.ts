import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateFormularioServosDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @Length(11, 11, { message: 'CPF deve ter 11 dígitos' })
  cpf: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da credencial é obrigatório' })
  nomeCredencial: string;

  @IsOptional()
  @IsString()
  tamanhoCamiseta?: string;

  @IsOptional()
  @IsString()
  alergiaRestricao?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
