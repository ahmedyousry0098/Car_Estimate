import {Module, MiddlewareConsumer} from '@nestjs/common'
import {APP_INTERCEPTOR} from '@nestjs/core'
import { UserController } from './user.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './entity/user.entity';
import { CurrentUserMiddleware } from './middlewares/currentUser.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [
        UserService, 
        AuthService,
    ],
    exports: []
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes('*')
    }
}