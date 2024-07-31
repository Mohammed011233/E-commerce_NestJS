import { Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDoc } from "../models/category.entity";
import { Model } from "mongoose";
import { CategoryDto } from "../dto/category.dto";
import { GlobalExceptionFilter } from "src/filters/globalException.filter";

@Injectable()
@UseFilters(GlobalExceptionFilter)
export class CategoryService{
    constructor(@InjectModel(Category.name) private categoryRepo: Model<CategoryDoc>){}

    async createCategory(categoryDto: CategoryDto){
        const createdCategory = new this.categoryRepo(categoryDto);

        return createdCategory.save();
    }

    async findOne(categoryId: String){
        const foundedCategory = await this.categoryRepo.findById(categoryId).exec();
    
        return foundedCategory;
    }

    async findAll(){
        const allCategorys = await this.categoryRepo.find().exec();

        return allCategorys;
    }

    async updateCategory(categoryId: String, categoryDto: CategoryDto){
        const createdCategory = this.categoryRepo.findByIdAndUpdate(categoryId, categoryDto, {new: true});

        return createdCategory.updateOne();
    }

    async deleteCategory(categoryId: String){
        const deletedCategory = await this.categoryRepo.findByIdAndDelete(categoryId).exec();

        return deletedCategory;
    }

}