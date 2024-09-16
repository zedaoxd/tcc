import { Injectable } from '@nestjs/common';

import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

@Injectable()
export class MercadoPagoService {
  async createPayment({ body, requestOptions }: MercadoPago.PaymentCreateData) {
    const payment = new Payment(client);

    console.log(body);

    return payment
      .create({ body, requestOptions })
      .then(({ status, status_detail, id }) => ({
        status: status,
        detail: status_detail,
        mercadoPagoPaymentId: id,
      }))
      .catch((error) => {
        console.log('Error creating payment', error);
        const { errorMessage, errorStatus } = this.validateError(error);
        return { errorMessage, errorStatus };
      });
  }

  private validateError(error: any) {
    let errorMessage = 'Unknown error cause';
    let errorStatus = 400;

    if (error.cause) {
      const sdkErrorMessage = error.cause[0].description;
      errorMessage = sdkErrorMessage || errorMessage;

      const sdkErrorStatus = error.status;
      errorStatus = sdkErrorStatus || errorStatus;
    }

    return { errorMessage, errorStatus };
  }
}
