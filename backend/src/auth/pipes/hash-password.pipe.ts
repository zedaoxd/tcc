import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from '../dto/user-create.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  async transform(dto: UserCreateDTO): Promise<UserCreateDTO> {
    const SALT_OR_ROUNDS = this.configService.get<string>('SALT_OR_ROUNDS');

    return {
      ...dto,
      password: await bcrypt.hash(dto.password, SALT_OR_ROUNDS),
    };
  }
}
