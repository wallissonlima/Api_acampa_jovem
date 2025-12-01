import { Test, TestingModule } from '@nestjs/testing';
import { TimelineService } from './timeline.service';
import { PrismaService } from '../database/prisma.service';

describe('TimelineService', () => {
  let service: TimelineService;
  let prisma: jest.Mocked<PrismaService>;

  const mockPrisma = {
    timeline: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    evento: {
      delete: jest.fn(),
    },
  } as unknown as jest.Mocked<PrismaService>;

  beforeEach(async () => {
    // reset all mocks before each test to avoid cross-test pollution
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimelineService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TimelineService>(TimelineService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get should return existing timeline without creating a new one', async () => {
    const existing = { id: 1, eventDate: new Date('2025-01-01'), milestones: [{ id: 10 }] } as any;
    prisma.timeline.findFirst.mockResolvedValueOnce(existing);

    const result = await service.get();

    expect(prisma.timeline.findFirst).toHaveBeenCalledWith({ include: { milestones: true } });
    expect(prisma.timeline.create).not.toHaveBeenCalled();
    expect(result).toBe(existing);
  });

  it('get should create timeline when none exists (default date and empty milestones)', async () => {
    prisma.timeline.findFirst.mockResolvedValueOnce(null as any);
    const created = { id: 2, eventDate: new Date('2025-02-02'), milestones: [] } as any;
    prisma.timeline.create.mockResolvedValueOnce(created);

    const result = await service.get();

    expect(prisma.timeline.findFirst).toHaveBeenCalledWith({ include: { milestones: true } });
    expect(prisma.timeline.create).toHaveBeenCalledWith({
      data: {
        eventDate: expect.any(Date),
        milestones: { create: [] },
      },
      include: { milestones: true },
    });
    expect(result).toBe(created);
  });

  it('save should create when no timeline exists and map milestones (including default note)', async () => {
    prisma.timeline.findFirst.mockResolvedValueOnce(null as any);

    const input = {
      eventDate: '2025-03-03',
      milestones: [
        { title: 'A', date: '2025-03-01', note: 'n1' },
        { title: 'B', date: '2025-03-02' }, // note missing => default ""
      ],
    };

    const created = { id: 3, eventDate: new Date(input.eventDate), milestones: [] } as any;
    prisma.timeline.create.mockResolvedValueOnce(created);

    const result = await service.save(input.eventDate, input.milestones as any);

    expect(prisma.timeline.findFirst).toHaveBeenCalled();
    expect(prisma.timeline.create).toHaveBeenCalledWith({
      data: {
        eventDate: new Date('2025-03-03'),
        milestones: {
          create: [
            { title: 'A', date: new Date('2025-03-01'), note: 'n1' },
            { title: 'B', date: new Date('2025-03-02'), note: '' },
          ],
        },
      },
      include: { milestones: true },
    });
    expect(result).toBe(created);
  });

  it('save should update existing timeline: deleteMany then recreate mapped milestones', async () => {
    prisma.timeline.findFirst.mockResolvedValueOnce({ id: 9 } as any);

    const input = {
      eventDate: '2025-04-04',
      milestones: [
        { title: 'C', date: '2025-04-01', note: 'nc' },
      ],
    };

    const updated = { id: 9, eventDate: new Date(input.eventDate), milestones: [] } as any;
    prisma.timeline.update.mockResolvedValueOnce(updated);

    const result = await service.save(input.eventDate, input.milestones as any);

    expect(prisma.timeline.update).toHaveBeenCalledWith({
      where: { id: 9 },
      data: {
        eventDate: new Date('2025-04-04'),
        milestones: {
          deleteMany: {},
          create: [
            { title: 'C', date: new Date('2025-04-01'), note: 'nc' },
          ],
        },
      },
      include: { milestones: true },
    });
    expect(result).toBe(updated);
  });

  it('delete should call prisma.evento.delete with id and return its result', async () => {
    const deleted = { id: 123 } as any;
    prisma.evento.delete.mockResolvedValueOnce(deleted);

    const result = await service.delete(123);

    expect(prisma.evento.delete).toHaveBeenCalledWith({ where: { id: 123 } });
    expect(result).toBe(deleted);
  });
});
