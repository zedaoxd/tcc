import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CategoriesModule } from './categories/categories.module';
import { CourseRepository } from './course.repository';
import { PrismaService } from 'src/prisma.service';
import { PurchaseModule } from './purchase/purchase.module';
import { UploadService } from 'src/upload/upload.service';
import { IsCategoryExistsValidator } from './validator/is-category-exists-validator';
import { CategoryRepository } from './categories/categories.repository';
import { UserRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { IsAuthorExistsValidator } from './validator/is-author-exists-validator';

@Module({
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseRepository,
    PrismaService,
    UploadService,
    IsCategoryExistsValidator,
    IsAuthorExistsValidator,
    CategoryRepository,
    UserRepository,
  ],
  imports: [CategoriesModule, PurchaseModule, CategoriesModule, UsersModule],
})
export class CourseModule {}
