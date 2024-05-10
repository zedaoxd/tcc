import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePaymentMercadoPagoDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  transactionAmount: number;

  @IsNotEmpty()
  paymentMethodId: string;

  @IsEmail()
  payerEmail: string;

  @IsNotEmpty()
  issuerId: number;

  @IsNotEmpty()
  installments: number;

  @IsNotEmpty()
  description: string;
}
