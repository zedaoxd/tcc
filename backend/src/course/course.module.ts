import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CategoriesModule } from './categories/categories.module';
import { CourseRepository } from './course.repository';
import { PrismaService } from 'src/prisma.service';
import { PurchaseModule } from './purchase/purchase.module';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, PrismaService, UploadService],
  imports: [CategoriesModule, PurchaseModule],
})
export class CourseModule {}
