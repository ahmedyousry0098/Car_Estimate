import {Expose} from 'class-transformer'
import { Role } from '../entity/user.entity';

export class UserDTO {
    @Expose()
    id: string;

    @Expose()
    email: string

    @Expose()
    role: Role
}