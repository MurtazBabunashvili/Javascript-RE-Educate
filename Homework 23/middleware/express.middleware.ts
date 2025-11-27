import { NextFunction, Request, Response } from "express"

export function ExpressMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("I am middleware")
    next()
}