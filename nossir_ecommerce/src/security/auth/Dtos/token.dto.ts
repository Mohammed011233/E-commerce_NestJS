import { IsString, IsUUID } from "class-validator";

export class TokenDto{
    @IsString()
    @IsUUID()
    refreshToken: String;
}