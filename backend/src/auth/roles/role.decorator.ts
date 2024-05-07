import { SetMetadata } from '@nestjs/common';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const Role = (role: Roles) => SetMetadata('role', role);
