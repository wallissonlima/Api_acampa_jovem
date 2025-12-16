import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateFormularioServosDto } from './dto/create-formulario.dto';
import { FormularioServos, Prisma } from '@prisma/client';

@Injectable()
export class FormularioServosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFormularioServosDto): Promise<FormularioServos> {

    try {
      return await this.prisma.formularioServos.create({
        data: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          telefone: data.telefone,
          nomeCredencial: data.nomeCredencial,
          tamanhoCamiseta: data.tamanhoCamiseta,
          alergiaRestricao: data.alergiaRestricao,
          descricao: data.descricao,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new BadRequestException('CPF já está cadastrado!');
        }
      }
      throw err;
    }
  }

  async findAll(): Promise<FormularioServos[]> {
    return this.prisma.formularioServos.findMany();
  }

  async findOne(id: number): Promise<FormularioServos | null> {
    return this.prisma.formularioServos.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: Prisma.FormularioServosUpdateInput,
  ): Promise<FormularioServos> {
    try {
      return await this.prisma.formularioServos.update({
        where: { id },
        data,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new BadRequestException('Formulário não encontrado');
        }
      }
      throw err;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.formularioServos.delete({
        where: { id },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new BadRequestException('Formulário não encontrado');
        }
      }
      throw err;
    }
  }
}
