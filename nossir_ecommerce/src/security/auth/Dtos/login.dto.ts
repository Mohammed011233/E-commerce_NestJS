import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email: String;

    @IsNotEmpty()
    @IsString()
    password: string;
}