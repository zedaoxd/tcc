import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreatePaymentMercadoPagoDto } from './create-payment-mercado-pago.dto';
import { Type } from 'class-transformer';

export class CreatePurchaseDto {
  @IsNotEmpty()
  courseId: string;

  @ValidateNested()
  @Type(() => CreatePaymentMercadoPagoDto)
  payment: CreatePaymentMercadoPagoDto;
}
