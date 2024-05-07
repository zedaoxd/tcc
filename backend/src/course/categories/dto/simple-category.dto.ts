import { Category } from '../entities/category.entity';

export class SimpleCategoryDto {
  id: string;
  name: string;

  constructor(entity: Category) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
