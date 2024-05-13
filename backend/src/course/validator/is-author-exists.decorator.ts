import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsAuthorExistsValidator } from './is-author-exists-validator';

export const IsAuthorExists = (options?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [],
      validator: IsAuthorExistsValidator,
    });
  };
};
