import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) { }

  // cria evento (imagem pode ser data URI em evento.imagem)
  async create(data: {
    titulo: string;
    descricao?: string;
    dataInicio?: string;
    dataFim?: string;
    imagemDataUri?: string; // opcional (data:image/...)
  }) {
    const payload: any = {
      titulo: data.titulo,
      descricao: data.descricao || null,
      createdAt: new Date(),
    };

    if (data.dataInicio && data.dataInicio.trim()) {
      payload.dataInicio = new Date(data.dataInicio);
    }

    if (data.dataFim && data.dataFim.trim()) {
      payload.dataFim = new Date(data.dataFim);
    }

    if (data.imagemDataUri) {
      payload.imagem = data.imagemDataUri;
    }

    return this.prisma.evento.create({ data: payload });
  }

  findAll() {
    return this.prisma.evento.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async delete(id: number) {
    return this.prisma.evento.delete({ where: { id } });
  }

  // opcional: get one
  findOne(id: number) {
    return this.prisma.evento.findUnique({ where: { id } });
  }
}
