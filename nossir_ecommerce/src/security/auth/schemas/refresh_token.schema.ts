import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps: true, versionKey:false})
export class RefreshToken{
    @Prop({required: true})
    token: String;

    @Prop({required: true, type: mongoose.Types.ObjectId, ref: "UserEntity"})
    userId: mongoose.Types.ObjectId;

    @Prop({required: true})
    expiryDate: Date;
}

export type TokenDoc = RefreshToken & Document;

export const tokenSchema = SchemaFactory.createForClass(RefreshToken);