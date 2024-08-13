import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { RefreshToken, TokenDoc } from "./schemas/refresh_token.schema";
import { Model } from "mongoose";
import { v4 as uuid } from "uuid";
import { TokenDto } from "./Dtos/token.dto";
import { UserDoc, UserEntity } from "src/user/schemas/user.schema";

@Injectable({})
export class TokenService {
    constructor(@InjectModel(RefreshToken.name) private tokenRepo: Model<TokenDoc>,
                @InjectModel(UserEntity.name) private userRepo: Model<UserDoc>,
                private jwtServic: JwtService) { }


    async refreshTokens(tokenDto: TokenDto){

        try{
            const foundToken = await this.tokenRepo.findOneAndDelete({
                                                        token: tokenDto.refreshToken,
                                                        expiryDate: {$gte: new Date()}
                                                    });
            
            if(!foundToken){
                throw new UnauthorizedException("the token is invalid or expiried");
            }

            const userOfToken = await this.userRepo.findById(foundToken.userId);

            if(!userOfToken){
                throw new UnauthorizedException("the token is invalid or expiried");
            }

            return this.generateUserToken(userOfToken);
        }catch(err){
            throw new UnauthorizedException(err.message);
        }   

        
    }

    async generateUserToken(user: any) {
        const accessToken = this.jwtServic
            .sign({
                userId: user._id,
                email: user.email,
                password: user.password
            },
                {
                    expiresIn: "2d"
                });

        const refreshToken = uuid();

        this.storeRefreshToken(user._id , refreshToken)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }

    }


    private async storeRefreshToken(userId: String , token: String){

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);

        const createdToken = await this.tokenRepo.create({token, userId, expiryDate})

        createdToken.save();
    }


}