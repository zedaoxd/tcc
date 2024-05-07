import { PartialType } from '@nestjs/mapped-types';
import { CreateCurseDto } from './create-curse.dto';

export class UpdateCurseDto extends PartialType(CreateCurseDto) {}
