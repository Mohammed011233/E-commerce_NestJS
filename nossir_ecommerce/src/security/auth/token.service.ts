import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { RefreshToken, tokenDoc } from "./schemas/refresh_token.schema";
import { Model } from "mongoose";
import { v4 as uuid } from "uuid";

@Injectable({})
export class TokenService {
    constructor(@InjectModel(RefreshToken.name) private tokenRepo: Model<tokenDoc>,
        private jwtServic: JwtService) { }


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

    async storeRefreshToken(userId: String , token: String){

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);

        const createdToken = await this.tokenRepo.create({token, userId, expiryDate})

        createdToken.save();
    }


}