import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsCategoryExists } from '../validator/is-category-exists.decorator';
import { IsAuthorExists } from '../validator/is-author-exists.decorator';

export class FindAllQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  size: number = 20;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  @IsCategoryExists()
  category: string;

  @IsOptional()
  @IsString()
  @IsAuthorExists()
  author: string;

  @IsOptional()
  @IsString()
  price: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  rating: number;

  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  level: string;
}
