import { BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function UserAgentMiddleware(req: Request, res:Response, next:NextFunction) {
    const userAgent = req.headers["user-agent"]

    if (!userAgent || userAgent.includes("Chrome") || userAgent.includes("Mozila")) {
        throw new BadRequestException("You can not log in from chrome or mozila")
    }
    next()
}