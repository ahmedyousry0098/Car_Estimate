import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    ClassSerializerInterceptor
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Observable, map } from 'rxjs'

interface UserInterceptor {
    new (...args: any[]): {}
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: UserInterceptor) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}