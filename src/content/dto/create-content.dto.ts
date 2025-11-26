import { IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  page: string;

  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsString()
  type: string; // obrigatório porque no prisma também é
}
