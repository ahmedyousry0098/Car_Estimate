import {
    CanActivate,
    ExecutionContext
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Role } from 'src/user/entity/user.entity'

export class AdminGuard implements CanActivate {
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requset = context.switchToHttp().getRequest()
        if (!requset.currentUser || requset.currentUser?.role !== Role.ADMIN) {
            return false
        } else {
            return true
        }
    }
}