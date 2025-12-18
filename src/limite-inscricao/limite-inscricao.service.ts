import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class LimiteInscricaoService {
    constructor(private prisma: PrismaService) { }

    async getConfig() {
        let config = await this.prisma.limiteInscricao.findUnique({
            where: { id: 1 },
        });

        // cria automaticamente se não existir
        if (!config) {
            config = await this.prisma.limiteInscricao.create({
                data: { id: 1 },
            });
        }

        return config;
    }

    async atualizar(data: {
        limiteParticipantes?: number;
        limiteServos?: number;
        ativo?: boolean;
    }) {
        return this.prisma.limiteInscricao.upsert({
            where: { id: 1 },
            update: data,
            create: {
                id: 1,
                ...data,
            },
        });
    }

    async validarParticipantes() {
        const config = await this.getConfig();

        if (!config.ativo) {
            throw new BadRequestException('Inscrições desativadas');
        }

        if (config.limiteParticipantes !== null) {
            const total = await this.prisma.formulario.count();

            if (total >= config.limiteParticipantes) {
                throw new BadRequestException('Vagas esgotadas');
            }
        }
    }

    async validarServos() {
        const config = await this.getConfig();

        if (!config.ativo) {
            throw new BadRequestException('Inscrições desativadas');
        }

        if (config.limiteServos !== null) {
            const total = await this.prisma.formularioServos.count();

            if (total >= config.limiteServos) {
                throw new BadRequestException('Vagas de servos esgotadas');
            }
        }
    }

    async status() {
        const config = await this.getConfig();

        const totalParticipantes = await this.prisma.formulario.count();
        const totalServos = await this.prisma.formularioServos.count();

        return {
            ativo: config.ativo,
            limiteParticipantes: config.limiteParticipantes,
            limiteServos: config.limiteServos,
            totalParticipantes,
            totalServos,
            participantesEsgotados:
                config.limiteParticipantes !== null &&
                totalParticipantes >= config.limiteParticipantes,
            servosEsgotados:
                config.limiteServos !== null &&
                totalServos >= config.limiteServos,
        };
    }
}
