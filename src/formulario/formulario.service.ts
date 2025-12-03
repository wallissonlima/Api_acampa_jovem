import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, Formulario } from '@prisma/client';
import { CreateFormularioDto } from './dto/create-formulario.dto';

@Injectable()
export class FormularioService {
  constructor(private prisma: PrismaService) {}

  // Criar um novo formulário
  async create(data: CreateFormularioDto): Promise<Formulario> {
    // Converter dataNascimento caso venha no formato dd/MM/yyyy
    let isoDate: string | undefined = undefined;
    if (data.dataNascimento) {
      const parts = data.dataNascimento.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        if (!isNaN(Number(day)) && !isNaN(Number(month)) && !isNaN(Number(year))) {
          isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
      }
    }

    return this.prisma.formulario.create({
      data: {
        name: data.name,
        email: data.email,
        dataNascimento: isoDate ?? data.dataNascimento, // se isoDate undefined, usa a string original
        telefone: data.telefone,
        nomeCredencial: data.nomeCredencial,
        tamanhoCamiseta: data.tamanhoCamiseta,
        nomeResponsavel: data.nomeResponsavel,
        telefoneResponsavel: data.telefoneResponsavel,
        autorizacaoImagem: data.autorizacaoImagem,
        alergiaRestricao: data.alergiaRestricao,
        descricao: data.descricao,
      },
    });
  }

  async findAll(): Promise<Formulario[]> {
    return this.prisma.formulario.findMany();
  }

  async findOne(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.FormularioUpdateInput): Promise<Formulario> {
    return this.prisma.formulario.update({
      where: { id },
      data,
    });
  }

  async removeAll(): Promise<{ count: number }> {
    const deleted = await this.prisma.formulario.deleteMany({});
    return { count: deleted.count };
  }
}
