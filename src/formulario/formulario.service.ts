import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, Formulario } from '@prisma/client';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { LimiteInscricaoService } from 'src/limite-inscricao/limite-inscricao.service';

@Injectable()
export class FormularioService {
  constructor(private prisma: PrismaService, private limiteInscricaoService: LimiteInscricaoService,) { }

  // Criar um novo formulário
  async create(data: CreateFormularioDto): Promise<Formulario> {
    // 🔒 VERIFICA LIMITE DE INSCRIÇÕES (AQUI 👈)
    await this.limiteInscricaoService.validarParticipantes();

    // ❌ Regra: telefone não pode ser igual ao do responsável
    if (
      data.telefone &&
      data.telefoneResponsavel &&
      data.telefone === data.telefoneResponsavel
    ) {
      throw new BadRequestException(
        'O telefone do participante não pode ser igual ao telefone do responsável'
      );
    }
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

    try {
      return await this.prisma.formulario.create({
        data: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,

          dataNascimento: isoDate
            ? new Date(isoDate)
            : data.dataNascimento
              ? new Date(data.dataNascimento)
              : undefined,

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

    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException('CPF já está cadastrado!');
      }
      throw err;
    }
  }

  // Verificar se o CPF existe
  async existsCpf(cpf: string): Promise<boolean> {
    const exists = await this.prisma.formulario.findFirst({
      where: { cpf },
    });

    return !!exists;
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

  async delete(id: number) {
    return this.prisma.formulario.delete({
      where: { id },
    });
  }
}
