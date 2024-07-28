import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type } from "os";
import {v4 as uuid} from "uuid";
import { Category } from "./category.entity";
import mongoose from "mongoose";


@Schema({
    toJSON: {
        getters: true,
        virtuals: true
    },
    timestamps: true
})
export class Product{

    // @Prop({
    //     type: mongoose.Schema.Types.ObjectId,
    //     unique: true,
    //     default: ()=> {return uuid();}
    // })
    // productId: String;

    @Prop({required: true, index: true })
    productName: String;

    @Prop({required: true })
    quantity: Number;

    @Prop({
        required: true,
        get: (price: number) => price.toFixed(2)
     })
    price: Number;

    // Define a virtual property `formattedPrice`
    get formattedPrice(): string {
        return `${(this.price).toFixed(2)} EGP`;
    }

    @Prop({required: false })
    discount: Number;

    

    @Prop({required: true })
    description: String;

    @Prop({required: true })
    image: String;
    
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref:'Category', index: true })
    category: Category;
    // @Prop()
    // category: String;

}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductDoc = Product & Document; 

// Add virtual property to schema
// ProductSchema.virtual('formattedPrice').get(function () {
//     return `${(this.price).toFixed(2)} EGP`;
//   });
