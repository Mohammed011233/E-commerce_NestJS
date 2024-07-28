import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CategoryDto } from "../dto/category.dto";

@Controller("category")
export class CategoryController{
    constructor(private categoryService: CategoryService){}

    @Post()
    async createCategory(@Body() categoryDto: CategoryDto){
        return this.categoryService.createCategory(categoryDto);
    }

    @Get(":categoryId")
    findOne(@Param("categoryId") categoryId: String){
        return this.categoryService.findOne(categoryId);
    }

    @Get()
    async findAll(){
        return this.categoryService.findAll();

    }

    @Put(":categoryId")
    async updateCategory(
        @Param("categoryId") categoryId: String,
        @Body() categoryDto: CategoryDto
        ){
        return this.categoryService.updateCategory(categoryId, categoryDto);
        
    }

    @Delete(":categoryId")
    async deleteCategory(@Param("categoryId") categoryId: String){
        return this.categoryService.deleteCategory(categoryId);
    }
}