import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

    async create(info: Partial<User>) {
        const user = this.UserRepo.create(info)
        return await this.UserRepo.save(user)
    }

    async findOneById(id: string) {
        return await this.UserRepo.findOneBy({id})
    }

    async findOneByEmail(email: string) {
        return await this.UserRepo.findOneBy({email})
    }

    async findAll() {
        return await this.UserRepo.find()
    }
}