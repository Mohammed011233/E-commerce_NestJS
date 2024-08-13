import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/product.schema";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";
import { Category, CategorySchema } from "./schemas/category.schema";
import { CategoryController } from "./controllers/category.controller";
import { CategoryService } from "./services/category.service";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Product.name,
            schema: ProductSchema
        },
        {
        name: Category.name,
        schema: CategorySchema},
        ])
    ],
    controllers:[ProductController, CategoryController],
    providers:[ProductService, CategoryService]
})
export class InventoryModule{}