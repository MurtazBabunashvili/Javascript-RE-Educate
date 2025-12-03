import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class IsAdmin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const role = request.headers["role"]
        if (!role || !["admin"].includes(role)) {
            throw new BadRequestException("Insufficient role")
        }
        return true;
    }
}

export class IsEditor implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const role = request.headers["role"]
        if (!role || !["admin", "editor"].includes(role)) {
            throw new BadRequestException("Insufficient role")
        }
        return true;
    }
}

export class IsViewer implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const role = request.headers["role"]
        if (!role || !["admin", "editor", "viewer"].includes(role)) {
            throw new BadRequestException("Insufficient role")
        }
        return true;
    }
}