import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PaymentsService {
  private readonly accessToken = process.env.MP_ACCESS_TOKEN;

  constructor(private prisma: PrismaService) { }

  async createPayment(tipo: 'PARTICIPANTE' | 'SERVO') {
    // 🔹 Busca os valores configurados
    const valores = await this.prisma.valorInscricao.findUnique({
      where: { id: 1 },
    });

    if (!valores) {
      throw new BadRequestException(
        'Valores de inscrição não configurados',
      );
    }

    // 🔹 Define o preço conforme o tipo
    const price =
      tipo === 'SERVO'
        ? valores.priceServo
        : valores.priceParticipante;

    if (!price || price <= 0) {
      throw new BadRequestException(
        'Valor da inscrição inválido',
      );
    }

    const preference = {
      items: [
        {
          id: `inscricao-${tipo.toLowerCase()}`,
          title:
            tipo === 'SERVO'
              ? 'Inscrição Servo'
              : 'Inscrição Participante',
          quantity: 1,
          unit_price: Number(price),
          currency_id: 'BRL',
        },
      ],
      back_urls: {
        success: 'http://localhost:5173/sucesso',
        failure: 'http://localhost:5173/erro',
        pending: 'http://localhost:5173/pendente',
      },
      notification_url:
        'http://localhost:3000/api/webhook/mercadopago',
    };

    try {
      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        preference,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return { preferenceId: response.data.id };
    } catch (err: any) {
      console.error(
        'ERRO MERCADO PAGO:',
        err.response?.data || err,
      );
      throw new Error('Erro ao criar pagamento');
    }
  }
}
