import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/createProduct.dto";

@Controller("products")
export class ProductController{

    constructor(private productService: ProductService){}

    @Post()
    async createProduct(@Body(new ValidationPipe()) productDto: CreateProductDto){
        return this.productService.createProduct(productDto);
    }

    @Get(":productId")
    findOne(@Param("productId") productId: String){
        return this.productService.findOne(productId);
    }

    @Get()
    async findAll(){
        return this.productService.findAll();

    }

    @Put(":productId")
    async updateProduct(
        @Param("productId") productId: String,
        @Body() productDto: CreateProductDto
        ){
        return this.productService.updateProduct(productId, productDto);
        
    }

    @Delete(":productId")
    async deleteProduct(@Param("productId") productId: String){
        return this.productService.deleteProduct(productId);
    }
}