import {
    Controller, 
    Post,
    Get, 
    Body,
    Session,
    UseInterceptors,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common'
import { User as UserEntity} from './entity/user.entity';
import { AuthService } from './services/auth.service';
import { RegisterDTO, LoginDTO } from './DTOS/auth.dto';
import { CurrentUser } from './decorators/currentUser.decorator'
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './DTOS/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/auth')
@UseInterceptors(new SerializeInterceptor(UserDTO))
export class UserController {
    constructor(private AuthService: AuthService) {}

    @Post('/signup')
    async signup(@Body() body: RegisterDTO, @Session() session: any) {
        const user = await this.AuthService.register(body)
        if (user instanceof UserEntity) {
            session.userId = user.id
        }
        return user
    }

    @Post('/login')
    async logIn(@Body() body: LoginDTO, @Session() session: any) {
        const user = await this.AuthService.login(body)
        if (user instanceof UserEntity) {
            session.userId = user.id
        }
        return user
    }

    @Get('/me')
    getMe(@CurrentUser() user: Partial<UserEntity>, @Session() session: any) {
        if (!session.userId) {
            return new UnauthorizedException('Please login First')
        }
        return user
    }

    @Get('/users')
    @UseGuards(AuthGuard)
    async getUsers() {
        return await this.AuthService.getUsers()
    }

    @Get('/logout')
    logOut(@Session() session: any) {
        if (session.userId) {
            delete session.userId
            return 'logged Out Successfully'
        }
        return 'You are already signed out'
    }
}