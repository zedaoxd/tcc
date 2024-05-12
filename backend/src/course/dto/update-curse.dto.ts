import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsBoolean } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsBoolean()
  published: boolean;
}
