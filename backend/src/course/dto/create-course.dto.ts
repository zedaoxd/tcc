import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @MaxLength(36)
  categoryId: string;

  @IsOptional()
  discount: number;

  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  level: 'beginner' | 'intermediate' | 'advanced';

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  preview: boolean;
}
