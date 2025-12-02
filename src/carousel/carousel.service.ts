import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Express } from 'express';

@Injectable()
export class CarouselService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const items = await this.prisma.carouselItem.findMany({
            orderBy: { sortOrder: 'asc' },
        });

        // Converte buffer para base64 para o frontend
        return items.map(item => ({
            id: item.id,
            altText: item.altText,
            sortOrder: item.sortOrder,
            imageBase64: item.image.toString('base64'),
            mimeType: item.mimeType,
        }));
    }

    async create(data: { altText?: string; file: Express.Multer.File; sortOrder?: number }) {
        return this.prisma.carouselItem.create({
            data: {
                altText: data.altText ?? null,
                image: data.file.buffer,
                mimeType: data.file.mimetype,
                sortOrder: data.sortOrder ?? 0,
            },
        });
    }

    async update(id: number, data: { altText?: string; file?: Express.Multer.File; sortOrder?: number }) {
        return this.prisma.carouselItem.update({
            where: { id },
            data: {
                altText: data.altText ?? undefined,
                sortOrder: data.sortOrder ?? undefined,
                image: data.file ? data.file.buffer : undefined,
                mimeType: data.file ? data.file.mimetype : undefined,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.carouselItem.delete({ where: { id } });
    }
}
