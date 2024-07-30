import { ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import { error } from "console";
import { Request, Response } from "express";


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();

        res.status(status).json({
            statuscodevv: status,
            timestamp: new Date().toISOString,
            path: req.url,
            message: exception.message
        })
    }
}