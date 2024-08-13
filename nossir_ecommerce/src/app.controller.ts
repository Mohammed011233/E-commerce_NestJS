import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";

@UseGuards(AuthGuard)
@Controller()
export class AppController{

    
    @Get()
    protectedRout(@Req() req ){

        return {
            message : "Access resource ",
            userId: req.userId
         };
    }
}