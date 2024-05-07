import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [CategoriesModule],
})
export class CourseModule {}
