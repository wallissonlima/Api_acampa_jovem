import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadEventoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  dataInicio?: string; // ISO string esperado

  @IsOptional()
  @IsString()
  dataFim?: string; // ISO string esperado

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  fileType?: string; // ex: image/png

  @IsOptional()
  @IsString()
  base64?: string; // o conteúdo base64 (sem data: prefix)
}
