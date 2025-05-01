import {Request, Response, NextFunction} from "express";
import {ZodError} from "zod";
import {ResponseError} from "../error/responseError";

export const errorMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if(!error){
        next();
        return;
    }

    if(error instanceof ZodError){
        response.status(400).json({
            error: `Validation failed: ${JSON.stringify(error)}`,
        })
    }else if(error instanceof ResponseError){
        response.status(error.statusCode).json({
            error_message: error.message,
        });
    }else{
        response.status(500).json({
            error: error.message,
        });
    }
}