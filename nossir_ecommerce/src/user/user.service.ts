import { BadRequestException, flatten, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDoc, UserEntity } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UserDto} from "./dto/user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserServic{
    constructor(@InjectModel(UserEntity.name) private userRepo: Model<UserDoc>){}

    async createUser(userDto: UserDto): Promise<UserDoc>{
        try{
            const foundEmailUser = await this.userRepo.findOne({ email: userDto.email});

            if(foundEmailUser){
                throw new BadRequestException(`${userDto.email} is aready used !!`);
            }

            const foundPhoneUser = await this.userRepo.findOne({ phone: userDto.phone});

            if(foundPhoneUser){
                throw new BadRequestException(`${userDto.phone} is aready used !!`);
            }
            
// increption of the password
            userDto.password = bcrypt.hashSync(userDto.password, 10);

            const createdUser = new this.userRepo(userDto);
            return createdUser.save();
        }catch(ex){
            throw new InternalServerErrorException(ex.message);
        }
    }

    async findOne(userId: String): Promise<any>{
        try{
            const foundedUser = await this.userRepo.findById(userId).exec();
            
            // foundedUser.category = await this.categoryRepo.findById(foundedUser.category);

            return foundedUser;
        }catch(ex){
            throw new NotFoundException(`Not found with id:=> ${userId}`)
        }
    }

    async findAll(): Promise<UserDoc[]>{
        try {
            const AllUsers = await this.userRepo.find().exec();
            return AllUsers;
        } catch (ex) {
            throw new InternalServerErrorException(ex.message);
        }
        
    }

    async updateUser(userId: String, userDto: UserDto): Promise<UserDoc>{
       try{ 
        
            const updatedUser = await 
                        this.userRepo.
                                    findByIdAndUpdate(userId,userDto, {new: true });

            
            return updatedUser; 
       }catch(ex){
            throw new InternalServerErrorException(ex.message);
       }
    }

    async deleteUser(userId: String): Promise<UserDoc>{
        try{
            const deletedUser = await this.userRepo.findByIdAndDelete(userId).exec();

            if(!deletedUser){
                throw new NotFoundException(`Not found with id:=> ${userId}`)
            }
            
            return deletedUser;
        }catch(ex){
            throw new NotFoundException(ex.message);
        }
    }
}