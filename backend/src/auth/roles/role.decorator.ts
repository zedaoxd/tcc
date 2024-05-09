import { SetMetadata } from '@nestjs/common';

export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const Role = (role: ROLE) => SetMetadata('role', role);
