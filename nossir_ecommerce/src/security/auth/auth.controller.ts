import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserDto } from "src/user/dto/user.dto";
import { UserDoc } from "src/user/schemas/user.schema";
import { UserServic } from "src/user/user.service";
import { LoginDto } from "./Dtos/login.dto";
import { AuthServic } from "./auth.service";
import { TokenDto } from "./Dtos/token.dto";
import { TokenService } from "./token.service";

@Controller("auth")
export class AuthController{

    constructor(private userService: UserServic,
                private authServic: AuthServic,
                private tokenService: TokenService){}

    @Post("registration")
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    async signIn(@Body() userDto: UserDto): Promise<UserDoc>{
        return this.userService.createUser(userDto);
    }

    @Post("login")
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDto: LoginDto): Promise<any>{
        return this.authServic.loginUser(loginDto);
    }

    @Post("refresh")
    @UsePipes(new ValidationPipe())
    async refreshTokens(@Body() tokenDto: TokenDto){
        return this.tokenService.refreshTokens(tokenDto);
    }
}