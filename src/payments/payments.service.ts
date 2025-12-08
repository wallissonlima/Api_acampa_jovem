import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  private readonly accessToken = process.env.MP_ACCESS_TOKEN;

  async createPayment(data: any) {
    const price = Number(data.price);

    if (!price || isNaN(price) || price <= 0) {
      throw new Error('Preço inválido');
    }

    const preference = {
      items: [
        {
          id: "acampa-2025",
          title: "Inscrição Acampa Jovem",
          quantity: 1,
          unit_price: price,
          currency_id: "BRL",
        },
      ],
      // auto_return: "approved",
      back_urls: {
        success: "http://localhost:5173/sucesso",
        failure: "http://localhost:5173/erro",
        pending: "http://localhost:5173/pendente",
      },
      notification_url: "http://localhost:3000/api/webhook/mercadopago",
    };

    try {
      const response = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        preference,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { preferenceId: response.data.id };

    } catch (err: any) {
      console.error("ERRO MERCADO PAGO:", err.response?.data || err);
      throw new Error("Erro ao criar pagamento");
    }

  }
}
