import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { CategoryRepository } from '../categories.repository';

@Injectable()
@ValidatorConstraint({ name: 'isUniqueCategory', async: true })
export class IsUniqueCategoryValidator implements ValidatorConstraintInterface {
  constructor(private readonly repository: CategoryRepository) {}

  async validate(name: string): Promise<boolean> {
    return !(await this.repository.existsByName(name));
  }

  defaultMessage(): string {
    return 'Category $value is already taken. Choose another category.';
  }
}

export const IsUniqueCategory =
  (options?: ValidationOptions) => (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [],
      validator: IsUniqueCategoryValidator,
    });
  };
