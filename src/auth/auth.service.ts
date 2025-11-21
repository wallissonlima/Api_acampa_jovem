import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(name: string, email: string, password: string, role: string) {
        const hashed = await bcrypt.hash(password, 10);

        // garantir que ADMIN só é aceito se enviado corretamente
        const userRole = role?.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER';

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashed,
                role: userRole
            }
        });

        const { password: _p, ...rest } = user;
        return rest;
    }

    async validateUser(email: string, password: string) {
        console.log('Email recebido:', email);
        const user = await this.prisma.user.findUnique({ where: { email } });
        console.log('Usuário encontrado:', user);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas (usuário não encontrado)');
        }

        const valid = await bcrypt.compare(password, user.password);
        console.log('Senha válida?', valid);

        if (!valid) {
            throw new UnauthorizedException('Credenciais inválidas (senha incorreta)');
        }

        return user;
    }


    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };

        const token = this.jwtService.sign(payload);

        return {
            token,
            user,
        };
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                createdAt: true, // opcional
            },
        });
    }

}
