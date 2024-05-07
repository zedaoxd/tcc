import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from "../dto/user-create.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HashPasswordPipe implements PipeTransform {
    constructor(private readonly configService: ConfigService) { }

    transform(dto: UserCreateDTO, metadata: ArgumentMetadata) {
        const SALT_OR_ROUNDS = this.configService.get<string>('SALT_OR_ROUNDS');

        return {
            ...dto,
            password: bcrypt.hashSync(dto.password, SALT_OR_ROUNDS)
        }
    }
}