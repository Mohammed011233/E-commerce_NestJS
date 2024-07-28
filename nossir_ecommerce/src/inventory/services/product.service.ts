import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDoc } from "../models/product.entity";
import { Model } from "mongoose";
import { CreateProductDto } from "../dto/createProduct.dto";
import { error } from "console";

@Injectable()
export class ProductService{

    constructor(@InjectModel(Product.name) private productRepo: Model<ProductDoc> ){}

    async createProduct(productDto: CreateProductDto){
        const createdProduct = new this.productRepo(productDto);

        return createdProduct.save();
    }

    async findOne(productId: String){
        const foundedProduct = await this.productRepo.findById(productId).exec();
    
        return foundedProduct;
    }

    async findAll(){
        const AllProducts = await this.productRepo.find().exec();

        return AllProducts;
    }

    async updateProduct(productId: String, productDto: CreateProductDto){
        const createdProduct = this.productRepo.findByIdAndUpdate(productId, productDto, {new: true});

        return createdProduct.updateOne();
    }

    async deleteProduct(productId: String){
        const deletedProduct = await this.productRepo.findByIdAndDelete(productId).exec();

        return deletedProduct;
    }

}