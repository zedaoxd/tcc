import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { MercadoPagoService } from 'src/mercado-pago/mercado-pago.service';
import { PrismaService } from 'src/prisma.service';
import { PurchaseRepository } from './purchase.repository';

@Module({
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    MercadoPagoService,
    PrismaService,
    PurchaseRepository,
  ],
})
export class PurchaseModule {}
