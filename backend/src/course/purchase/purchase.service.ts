import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
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
    const response = await this.mercadoPagoService.createPayment({ body });

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
      mercadoPagoId: response.mercadoPagoPaymentId,
    });
  }

  findAll() {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
