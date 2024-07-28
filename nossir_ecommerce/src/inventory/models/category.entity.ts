import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Category{
    @Prop({
        require: true,
        unique: true,
        index: true
    })
    name: String;

    @Prop()
    description: String;
}

export type CategoryDoc = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);