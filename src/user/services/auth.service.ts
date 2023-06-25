import { Injectable, ConflictException, BadRequestException } from '@nestjs/common'
import { User } from '../entity/user.entity'
import {hashSync, genSaltSync, compareSync} from 'bcryptjs'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
    constructor(private UserService: UserService) {}

    async register(data: Partial<User>) {
        const {username, email, password, role} = data
        const user = await this.UserService.findOneByEmail(email)
        
        if (user) {
            console.log('user exist')
            throw new ConflictException('User Already Exist')
        }

        const salt = genSaltSync(Number(process.env.SALT_ROUNDS))
        const hashedPassword = hashSync(password, salt)

        return this.UserService.create({username, email, password: hashedPassword, role})
    }

    async login (data: Partial<User>) {
        const {email, password} = data
        const user = await this.UserService.findOneByEmail(email)
        if (!user) {
            throw new BadRequestException('In-valid Login credentials')
        }
        const isPassMatch = compareSync(password, user.password)
        if (!isPassMatch) {
            throw new BadRequestException('In-valid Login credentials')
        }
        return user
    }

    async getUsers() {
        const users = await this.UserService.findAll()
        if (!users.length) {
            return 'Not Found'
        }
        return users
    }
}
