import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { AuthRepository } from '../auth.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'isUniqueEmail', async: true })
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly authRepository: AuthRepository) {}

  validate(value: any): boolean | Promise<boolean> {
    return this.authRepository.findUserByEmail(value).then((user) => {
      return !user;
    });
  }

  defaultMessage(): string {
    return 'Email $value is already taken. Choose another email.';
  }
}

export const IsUniqueEmail = (options?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [],
      validator: IsUniqueEmailValidator,
    });
  };
};
