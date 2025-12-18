import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ValorIncricaoService {
    constructor(private prisma: PrismaService) { }

    // 🔹 Buscar valores
    async getValores() {
        return this.prisma.valorInscricao.findUnique({
            where: { id: 1 },
        });
    }

    // 🔹 Atualizar valores
    async updateValores(
        priceParticipante: number,
        priceServo: number,
    ) {
        return this.prisma.valorInscricao.upsert({
            where: { id: 1 },
            update: {
                priceParticipante,
                priceServo,
            },
            create: {
                id: 1,
                priceParticipante,
                priceServo,
            },
        });
    }
}
