import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/createProduct.dto";

@Controller("products")
export class ProductController{

    constructor(private productService: ProductService){}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
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

    @Patch(":productId")
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
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