import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import type { User } from '@prisma/client';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: any) {
    const hash = await bcrypt.hash(data.password, 10);

    const role =
      data.role && data.role.toUpperCase() === 'ADMIN'
        ? 'ADMIN'
        : 'USER';

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        role,
      },
    });
  }
}