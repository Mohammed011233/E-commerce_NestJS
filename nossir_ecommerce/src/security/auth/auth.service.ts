import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LoginDto } from "./Dtos/login.dto";
import { UserDoc, UserEntity } from "src/user/schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "./token.service";
@Injectable()
export class AuthServic{

    constructor(@InjectModel(UserEntity.name) private userRepo: Model<UserDoc>,
                private tokenService: TokenService){}

    async loginUser(loginDto: LoginDto){
        const {email, password} = loginDto;
        // find the user
        const user = await this.userRepo.findOne({email});

        if(!user){
            throw new UnauthorizedException("the Email is Invalid");
        }

        const isCorrectPass = bcrypt.compareSync(password, user.password);

        if(!isCorrectPass){
            throw new UnauthorizedException("the password is not correct");
        }

        return  this.tokenService.generateUserToken(user)
        
    }

    // generateUserToken(user: any){
    //     return this.jwtServic
    //                 .sign({
    //                         userId: user._id,
    //                         email: user.email,
    //                         password: user.password
    //                     },
    //                     {
    //                       expiresIn: "2d"  
    //                     })
    // }
}