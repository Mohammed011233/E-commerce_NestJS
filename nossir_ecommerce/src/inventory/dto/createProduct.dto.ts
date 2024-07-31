import { IsDecimal, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CategoryDto } from './category.dto';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name is required.' })
  @IsString({ message: 'Product name must be a string.' })
  productName: string;

  @IsNotEmpty({ message: 'Quantity is required.' })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;

  @IsNotEmpty({ message: 'Price is required.' })
  @IsNumber({}, { message: 'Price must be a number.' })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'Discount must be a number.' })
  discount?: number;

  @IsNotEmpty({ message: 'Category is required.' })
  @IsMongoId({ message: 'Category must be a valid Mongo ID.' })
  category: CategoryDto; // Assuming CategoryDto will be validated separately

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string.' })
  image?: string;
}
