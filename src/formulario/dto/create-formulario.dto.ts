// src/formulario/dto/create-formulario.dto.ts
export class CreateFormularioDto {
  name: string;
  email: string;
  cpf: string;
  telefone?: string;
  dataNascimento?: string;
  nomeResponsavel?: string;
  telefoneResponsavel?: string;
  nomeCredencial: string;
  tamanhoCamiseta?: string;
  autorizacaoImagem?: string;
  alergiaRestricao?: string;
  descricao?: string;
}
