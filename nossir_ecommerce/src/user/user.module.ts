import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, userSchema } from './schemas/user.schema';
import { UserServic } from './user.service';
import { UserController } from './user.controller';

@Module({
    
    imports:[
        MongooseModule.forFeature([
            {
                name: UserEntity.name,
                schema: userSchema
            }
        ])
    ],

    controllers: [UserController],
    providers: [UserServic]
})
export class UserModule {}
