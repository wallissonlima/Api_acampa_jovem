import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UploadEventoDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {

  constructor(private prisma: PrismaService) {}

  async listAll() {
    return this.prisma.contentBlock.findMany({ orderBy: { page: 'asc' } });
  }

  async create(dto: CreateContentDto) {
    return this.prisma.contentBlock.create({ data: dto });
  }

  async update(id: number, dto: UploadEventoDto) {
    const existing = await this.prisma.contentBlock.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('ContentBlock not found');
    return this.prisma.contentBlock.update({ where: { id }, data: dto });
  }

  // DELETE 🔥 funcionando
  async delete(id: number) {
    const found = await this.prisma.contentBlock.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`ID ${id} não encontrado`);
    return await this.prisma.contentBlock.delete({ where: { id } });
  }

  async getById(id: number) {
    return this.prisma.contentBlock.findUnique({ where: { id } });
  }

  async getByPage(page: string) {
    const blocks = await this.prisma.contentBlock.findMany({
      where: { page },
      orderBy: { id: 'asc' },
    });

    const formatted = {};
    blocks.forEach((b) => (formatted[b.key] = b));

    return formatted;
  }

  async getByPageAndKey(page: string, key: string) {
    return this.prisma.contentBlock.findFirst({ where: { page, key } });
  }

  async saveMany(data: any[]) {
    for (const item of data) {
      if (item.id) {
        await this.prisma.contentBlock.update({
          where: { id: item.id },
          data: {
            value: item.value,
            title: item.title || null,
            description: item.description || null,
            type: item.type,
          },
        });
      } else {
        await this.prisma.contentBlock.create({
          data: {
            page: item.page,
            key: item.key,
            type: item.type,
            value: item.value,
            title: item.title || null,
            description: item.description || null,
          },
        });
      }
    }
    return { message: 'Conteúdo atualizado com sucesso' };
  }
}
