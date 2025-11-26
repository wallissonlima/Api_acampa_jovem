import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UploadEventoDto  } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getByPage(page: string) {
    const items = await this.prisma.contentBlock.findMany({
      where: { page },
      orderBy: { id: 'asc' },
    });
    // return as key:value map for convenience
    const map = {};
    items.forEach((i) => (map[i.key] = i));
    return map;
  }

  async listAll() {
    return this.prisma.contentBlock.findMany({ orderBy: { page: 'asc' }});
  }

  async create(dto: CreateContentDto) {
    return this.prisma.contentBlock.create({ data: dto });
  }

  async update(id: number, dto: UploadEventoDto ) {
    const existing = await this.prisma.contentBlock.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('ContentBlock not found');
    return this.prisma.contentBlock.update({ where: { id }, data: dto });
  }

  async delete(id: number) {
    await this.prisma.contentBlock.delete({ where: { id } });
    return { ok: true };
  }

  // helper: get single by id or by page+key
  async getById(id: number) {
    return this.prisma.contentBlock.findUnique({ where: { id } });
  }

  async getByPageAndKey(page: string, key: string) {
    return this.prisma.contentBlock.findFirst({ where: { page, key }});
  }
}
