import { HttpException, Injectable, InternalServerErrorException, NotFoundException, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDoc } from "../models/product.entity";
import { Model } from "mongoose";
import { CreateProductDto } from "../dto/createProduct.dto";
import { error } from "console";
import { GlobalExceptionFilter } from "src/filters/globalException.filter";
import { Category, CategoryDoc } from "../models/category.entity";

@Injectable()
@UseFilters(GlobalExceptionFilter)
export class ProductService{

    constructor(@InjectModel(Product.name) private productRepo: Model<ProductDoc>,
                @InjectModel(Category.name) private categoryRepo: Model<CategoryDoc> ){}

    async createProduct(productDto: CreateProductDto): Promise<ProductDoc>{
        try{
        const createdProduct = new this.productRepo(productDto);
        return createdProduct.save();
        }catch(ex){
            throw new InternalServerErrorException(ex.message);
        }
    }

    async findOne(productId: String): Promise<any>{
        try{
            const foundedProduct = await this.productRepo.findById(productId).populate('category').exec();
            
            // foundedProduct.category = await this.categoryRepo.findById(foundedProduct.category);

            return foundedProduct;
        }catch(ex){
            throw new NotFoundException(`Not found with id:=> ${productId}`)
        }
    }

    async findAll(): Promise<ProductDoc[]>{
        try {
            const AllProducts = await this.productRepo.find().populate('category').exec();
            return AllProducts;
        } catch (ex) {
            throw new InternalServerErrorException(ex.message);
        }
        
    }

    async updateProduct(productId: String, productDto: CreateProductDto): Promise<ProductDoc>{
       try{ 
            const updatedProduct = await 
                    this.productRepo.
                                    findByIdAndUpdate(productId, productDto, {new: true});
           
            return updatedProduct.populate('category'); 
       }catch(ex){
            throw new InternalServerErrorException(ex.message);
       }
    }

    async deleteProduct(productId: String): Promise<ProductDoc>{
        try{
            const deletedProduct = await this.productRepo.findByIdAndDelete(productId).exec();

            if(!deletedProduct){
                throw new NotFoundException(`Not found with id:=> ${productId}`)
            }
            
            return deletedProduct;
        }catch(ex){
            throw new NotFoundException(ex.message);
        }
    }

}