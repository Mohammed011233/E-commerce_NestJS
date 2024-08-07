import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Length, MinLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    @Length(3)
    name: String;
    
    @IsNotEmpty()
    @IsEmail()
    email: String;
    
    @IsNotEmpty()
    @MinLength(6)
    @IsStrongPassword()
    password: string;
    
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: String;
    
    @IsOptional()
    @IsString()
    address: String;

    @IsNotEmpty()
    test_version: String;
}