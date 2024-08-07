import { Body, Controller, Delete, Get, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserServic } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { UserDoc } from "./schemas/user.schema";
import { promises } from "dns";

@Controller("users")
export class UserController{
    constructor(private userService: UserServic){}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    async createUser(@Body() userDto: UserDto): Promise<UserDoc>{
        return this.userService.createUser(userDto);
    }

    @Get()
    async findUser(@Query("userId") userId: String): Promise<UserDoc>{
        return this.userService.findOne(userId);
    }

    @Get("all")
    async findAll(): Promise<UserDoc[]>{
        return this.userService.findAll();
    }

    @Patch()
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    async updateUser(
        @Query("userId") userId: String, 
        @Body() userDto: UserDto
    ): Promise<UserDoc>{
        return this.userService.updateUser(userId, userDto);
    }

    @Delete()
    async deleteUse(@Query("userId") userId: String): Promise<UserDoc>{
        return this.userService.deleteUser(userId);
    }

}