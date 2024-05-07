import { IsNotEmpty, MinLength } from 'class-validator';
import { IsUniqueCategory } from '../validator/is-unique-category-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsUniqueCategory()
  name: string;
}
