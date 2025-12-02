import {
    Controller,
    Get,
    Post,
    UseInterceptors,
    UploadedFiles,
    Body,
    HttpException,
    HttpStatus,
    Delete,
    Param,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CarouselService } from './carousel.service';
import { Express } from 'express';

@Controller('carousel')
export class CarouselController {
    constructor(private readonly carouselService: CarouselService) { }

    @Get()
    async findAll() {
        return await this.carouselService.findAll();
    }

    @Post('save')
    @UseInterceptors(
        AnyFilesInterceptor({
            limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        }),
    )
    async save(@UploadedFiles() files: Express.Multer.File[], @Body() body: any) {
        try {
            const items = typeof body.items === 'string' ? JSON.parse(body.items) : body.items;

            if (!Array.isArray(items)) {
                throw new HttpException('Invalid items payload', HttpStatus.BAD_REQUEST);
            }

            const fileMap: Record<string, Express.Multer.File> = {};
            if (Array.isArray(files)) {
                files.forEach(file => {
                    if (file?.fieldname) {
                        fileMap[file.fieldname] = file;
                    }
                });
            }

            for (const it of items) {
                const key = `file-${it.id ?? it.tempId}`;
                const uploaded = fileMap[key];

                if (it.id) {
                    // Atualiza item existente
                    const updateData: any = {
                        altText: it.altText ?? null,
                        sortOrder: it.sortOrder ?? 0,
                    };
                    if (uploaded) updateData.file = uploaded;

                    await this.carouselService.update(Number(it.id), updateData);
                } else {
                    // Cria novo item
                    if (!uploaded) {
                        throw new HttpException('New item missing image', HttpStatus.BAD_REQUEST);
                    }
                    await this.carouselService.create({
                        altText: it.altText ?? null,
                        file: uploaded,
                        sortOrder: it.sortOrder ?? 0,
                    });
                }
            }

            return { ok: true };
        } catch (err) {
            console.error(err);
            throw new HttpException('Server error saving carousel', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
        }

        return this.carouselService.remove(numericId);
    }
}
