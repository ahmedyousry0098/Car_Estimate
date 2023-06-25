import {Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterInsert, AfterUpdate, AfterRemove} from 'typeorm'
import {Exclude} from 'class-transformer'
import { log } from 'console';
import { Report } from 'src/reports/entity/reports.entity';

export enum Role {
    ADMIN = 'Admin',
    USER = 'User'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({default: Role.USER})
    role: Role

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

    @AfterInsert()
    insertAlert() {
        log(`${this.id} is inserted with email ${this.email}`)
    }

    @AfterUpdate()
    updateAlert() {
        log(`${this.id} is updated with info ${this}`)
    }

    @AfterRemove()
    removeAlert() {
        log(`${this.id} is removed with email ${this.email}`)
    }
}