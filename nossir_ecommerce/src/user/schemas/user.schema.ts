import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    collection: "Users",
    toJSON:{
        getters: true,
    },
    timestamps: true
})
export class UserEntity{
    @Prop({
        type: String
    })
    name: String;

    @Prop({
        type: String,
        unique: true,
        index: true
    })
    email: String;

    @Prop({
        type: String
    })
    password: string;

    @Prop({
        type: String,
        unique: true,
        index: true
    })
    phone: String;

    @Prop({})
    address: String;
    @Prop({})
    test_version: String;

}

export const userSchema = SchemaFactory.createForClass(UserEntity);

export type UserDoc = UserEntity & Document;