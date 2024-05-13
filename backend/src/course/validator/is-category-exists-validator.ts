import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../categories/categories.repository';

@Injectable()
@ValidatorConstraint({ name: 'isCategoryExists', async: true })
export class IsCategoryExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async validate(value: string): Promise<boolean> {
    const category = await this.categoryRepository.findOne(value);

    return !!category;
  }

  defaultMessage(): string {
    return 'Category id: [$value] does not exist.';
  }
}
