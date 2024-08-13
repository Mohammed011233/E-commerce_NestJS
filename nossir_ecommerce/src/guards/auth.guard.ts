import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService: JwtService){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            throw new UnauthorizedException();
        }
        
        try{
        const payload = this.jwtService.verify(token);
        req.userId = payload.userId;
        }catch(err){
            throw new UnauthorizedException(err.message)
        }

        return true;
    }


}