import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validator/is-unique-email-validator';
import { UserLoginDTO } from './user-login.dto';

export class UserCreateDTO extends UserLoginDTO {
  @IsUniqueEmail()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;
}
