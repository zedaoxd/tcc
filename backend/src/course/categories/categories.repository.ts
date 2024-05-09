import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({ data });
  }

  async existsByName(name: string) {
    const category = await this.prisma.category.findFirst({ where: { name } });
    return !!category;
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.category.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, data: UpdateCategoryDto) {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.category.delete({ where: { id } });
  }

  async findTopCategories() {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            courses: true,
          },
        },
      },
      orderBy: {
        courses: {
          _count: 'desc',
        },
      },
      take: 10,
    });
  }
}
