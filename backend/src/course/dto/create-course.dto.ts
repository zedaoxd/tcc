import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @MaxLength(255)
  imageUrl: string;

  @IsPositive()
  price: number;

  @IsNotEmpty()
  @MaxLength(36)
  categoryId: string;

  @IsOptional()
  @Min(0)
  @Max(1)
  discount: number;

  @IsOptional()
  preview: boolean;
}
