import { HttpException } from '@nestjs/common';

export class MercadoPagoException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
