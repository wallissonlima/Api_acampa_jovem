import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class DepoimentosService {

    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.depoimento.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    create(texto: string) {
        return this.prisma.depoimento.create({
            data: { texto }
        });
    }

    update(id: number, texto: string) {
        return this.prisma.depoimento.update({
            where: { id },
            data: { texto }
        });
    }

    delete(id: number) {
        return this.prisma.depoimento.delete({
            where: { id }
        });
    }
}
