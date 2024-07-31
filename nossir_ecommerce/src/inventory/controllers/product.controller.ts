import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/createProduct.dto";
import { ProductDoc } from "../models/product.entity";

@Controller("products")
export class ProductController{

    constructor(private productService: ProductService){}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    async createProduct(@Body(new ValidationPipe()) productDto: CreateProductDto): Promise<ProductDoc>{
        return this.productService.createProduct(productDto);
    }

    @Get()
    findOne(@Query("productId") productId: String): Promise<ProductDoc>{
        return this.productService.findOne(productId);
    }

    @Get("all")
    async findAll(): Promise<ProductDoc[]>{
        return this.productService.findAll();
    }

    @Patch(":productId")
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    async updateProduct(
        @Param("productId") productId: String,
        @Body() productDto: CreateProductDto
        ): Promise<ProductDoc>{
        return this.productService.updateProduct(productId, productDto);
        
    }

    @Delete(":productId")
    async deleteProduct(@Param("productId") productId: String): Promise<ProductDoc>{
        return this.productService.deleteProduct(productId);
    }
}