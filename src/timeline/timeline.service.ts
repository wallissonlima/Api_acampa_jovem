import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TimelineService {
    constructor(private prisma: PrismaService) { }

    async get() {
        let timeline = await this.prisma.timeline.findFirst({
            include: { milestones: true }
        });

        if (!timeline) {
            timeline = await this.prisma.timeline.create({
                data: {
                    eventDate: new Date(),
                    milestones: { create: [] }
                },
                include: { milestones: true }
            });
        }

        return timeline;
    }

    async save(eventDate: string, milestones: any[]) {
        let timeline = await this.prisma.timeline.findFirst();

        // Se não existir, cria
        if (!timeline) {
            return await this.prisma.timeline.create({
                data: {
                    eventDate: new Date(eventDate),
                    milestones: {
                        create: milestones.map(m => ({
                            title: m.title,
                            date: new Date(m.date),
                            note: m.note ?? ""
                        }))
                    }
                },
                include: { milestones: true }
            });
        }

        // Se já existe — limpa e recria
        return await this.prisma.timeline.update({
            where: { id: timeline.id },
            data: {
                eventDate: new Date(eventDate),
                milestones: {
                    deleteMany: {},
                    create: milestones.map(m => ({
                        title: m.title,
                        date: new Date(m.date),
                        note: m.note ?? ""
                    }))
                }
            },
            include: { milestones: true }
        });
    }
    async delete(id: number) {
        return this.prisma.evento.delete({ where: { id } });
    }
}
