import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategoryDto{
   
    @IsNotEmpty({ message: 'Category name is required.' })
    @IsString({ message: 'Category name must be a string.' })
    name: String;

    @IsOptional()
    @IsString({ message: 'Category description must be a string.' })
    description: String;
}