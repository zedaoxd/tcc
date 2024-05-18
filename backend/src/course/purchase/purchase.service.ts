import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { MercadoPagoService } from 'src/mercado-pago/mercado-pago.service';
import { MercadoPagoException } from 'src/errors/mercado-pago-exception';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly purchaseRepository: PurchaseRepository,
  ) {}

  async create({ courseId, payment: body }: CreatePurchaseDto, userId: string) {
    const response = await this.mercadoPagoService.createPayment({
      body: {
        token: body.token,
        transaction_amount: body.transactionAmount,
        payment_method_id: body.paymentMethodId,
        payer: {
          email: body.payerEmail,
        },
        issuer_id: body.issuerId,
        installments: body.installments,
        description: body.description,
      },
    });

    if ('errorMessage' in response) {
      throw new MercadoPagoException(
        response.errorMessage,
        response.errorStatus,
      );
    }

    return this.purchaseRepository.create({
      courseId,
      userId,
      status:
        response.status === 'approved' && response.detail === 'accredited'
          ? 'approved'
          : 'rejected',
      mercadoPagoId: response.mercadoPagoPaymentId.toString(),
    });
  }
}
