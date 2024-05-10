import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PurchaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PurchaseCreateManyInput) {
    const entity = await this.prisma.purchase.create({ data });

    await this.prisma.course.update({
      where: { id: data.courseId },
      data: { soldCount: { increment: 1 } },
    });

    return entity;
  }
}
