import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsCategoryExistsValidator } from './is-category-exists-validator';

export const IsCategoryExists = (options?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [],
      validator: IsCategoryExistsValidator,
    });
  };
};
