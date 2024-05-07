import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './categories.repository';
import { PrismaService } from 'src/prisma.service';
import { IsUniqueCategoryValidator } from './validator/is-unique-category-validator';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoryRepository,
    PrismaService,
    IsUniqueCategoryValidator,
  ],
})
export class CategoriesModule {}
