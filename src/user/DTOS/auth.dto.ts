import {IsEmail, IsEnum, IsString, IsStrongPassword, IsOptional} from 'class-validator'
import { Role } from '../entity/user.entity';

export abstract class AuthDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;
}

export class RegisterDTO extends AuthDTO{
    @IsString()
    username: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role
}

export class LoginDTO extends AuthDTO {}
