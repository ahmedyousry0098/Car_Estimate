import {NestMiddleware, Injectable} from '@nestjs/common'
import {Request, Response, NextFunction} from 'express'
import { UserService } from '../services/user.service';
import { User } from '../entity/user.entity';

declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private UserService: UserService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.session || {};
        console.log({userId});
        if (userId) {
            const user = await this.UserService.findOneById(userId)
            req.currentUser = user
        }
        next()
    }
}