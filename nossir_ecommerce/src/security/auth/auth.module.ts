import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserServic } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, userSchema } from 'src/user/schemas/user.schema';
import { AuthServic } from './auth.service';
import { RefreshToken, tokenSchema } from './schemas/refresh_token.schema';
import { TokenService } from './token.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: UserEntity.name,
                schema: userSchema
            },
            {
                name: RefreshToken.name,
                schema: tokenSchema
            }
        ])
    ],
    providers: [UserServic, AuthServic, TokenService],
    controllers:[AuthController]
})
export class AuthModule {}
