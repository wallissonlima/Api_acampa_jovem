import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PaymentsService {
  private readonly accessToken = process.env.MP_ACCESS_TOKEN;

  constructor(private prisma: PrismaService) {}

  async createPayment(inscricaoId: number) {
 
    if (!inscricaoId) {
      throw new BadRequestException('ID da inscrição não informado');
    }

    if (!this.accessToken) {
      throw new InternalServerErrorException(
        'MP_ACCESS_TOKEN não configurado no servidor',
      );
    }

    const valores = await this.prisma.valorInscricao.findUnique({
      where: { id: 1 },
    });

    if (!valores) {
      throw new BadRequestException('Valores de inscrição não configurados');
    }

    const inscricaoParticipante = await this.prisma.formulario.findUnique({
      where: { id: inscricaoId },
    });

    const inscricaoServo = await this.prisma.formularioServos.findUnique({
      where: { id: inscricaoId },
    });



    if (!inscricaoParticipante && !inscricaoServo) {
      throw new BadRequestException('Inscrição não encontrada');
    }

    const tipo: 'PARTICIPANTE' | 'SERVO' =
      inscricaoServo ? 'SERVO' : 'PARTICIPANTE';

    const inscricao = inscricaoServo || inscricaoParticipante;



    const price =
      tipo === 'SERVO' ? valores.priceServo : valores.priceParticipante;

    if (!price || Number(price) <= 0 || Number.isNaN(Number(price))) {
      throw new BadRequestException('Preço inválido para gerar pagamento');
    }

    const preference: any = {
      items: [
        {
          id: `inscricao-${tipo.toLowerCase()}-${inscricaoId}`,
          title:
            tipo === 'SERVO'
              ? 'Inscrição Servo'
              : 'Inscrição Participante',
          quantity: 1,
          unit_price: Number(price),
          currency_id: 'BRL',
        },
      ],
      payer: {
        name: inscricao?.name || undefined,
        email: inscricao?.email || undefined,
      },
      external_reference: `${tipo}:${inscricaoId}`,
      back_urls: {
        success: `https://acampajovem.com.br/sucesso?inscricaoId=${inscricaoId}&tipo=${tipo}`,
        failure: `https://acampajovem.com.br/erro?inscricaoId=${inscricaoId}&tipo=${tipo}`,
        pending: `https://acampajovem.com.br/pendente?inscricaoId=${inscricaoId}&tipo=${tipo}`,
      },
      auto_return: 'approved',
    };

    if (process.env.MP_WEBHOOK_URL) {
      preference.notification_url = process.env.MP_WEBHOOK_URL;
    }

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

 

      return {
        preferenceId: response.data.id,
        init_point: response.data.init_point,
        sandbox_init_point: response.data.sandbox_init_point,
        tipo,
        inscricaoId,
        valor: Number(price),
      };
    } catch (err: any) {
      console.error('=== ERRO MERCADO PAGO ===');
      console.error('STATUS:', err.response?.status);
      console.error('STATUS TEXT:', err.response?.statusText);
      console.error('DATA:', err.response?.data);
      console.error('MESSAGE:', err.message);
      console.error('STACK:', err.stack);

      throw new InternalServerErrorException(
        err.response?.data?.message ||
          err.response?.data?.cause ||
          err.message ||
          'Erro ao criar pagamento',
      );
    }
  }
}