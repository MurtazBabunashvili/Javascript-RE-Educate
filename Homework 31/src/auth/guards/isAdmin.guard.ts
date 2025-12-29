import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.role;
    if (role !== Role.ADMIN) {
      throw new BadRequestException('Permission denied. You can not do this!');
    }
    return true;
  }
}
