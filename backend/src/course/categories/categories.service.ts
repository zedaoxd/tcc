import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './categories.repository';
import { SimpleCategoryDto } from './dto/simple-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.repository.create(dto);
  }

  async findAll(): Promise<SimpleCategoryDto[]> {
    const entities: Category[] = await this.repository.findAll();

    return entities.map((entity) => new SimpleCategoryDto(entity));
  }

  async findOne(id: string): Promise<Category> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    return await this.repository.update(id, dto);
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }

  async findTopCategories() {
    return await this.repository.findTopCategories();
  }

  async findCategoriesWithCoursesSize() {
    return await this.repository.findCategoriesWithCoursesSize();
  }
}
