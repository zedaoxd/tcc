import { Course } from '../entities/course.entity';

export class FullCourseDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  price: number;
  discount: number;
  soldCount: number;
  rating: number;
  categoryId: string;
  preview: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: Course) {
    Object.assign(this, entity);
  }
}
