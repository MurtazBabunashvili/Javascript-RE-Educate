import { UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function isAdminMiddleware(req:Request, res:Response, next:NextFunction) {
    const adminToken = req.headers['admin']
    if (!adminToken || adminToken !== "admin12") {
        return next(new UnauthorizedException("You are not allowed to do this"));
    }
    next()
}