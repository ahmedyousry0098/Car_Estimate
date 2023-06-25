import { Injectable } from "@nestjs/common";
import { User } from "src/user/entity/user.entity";
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    price: number

    @Column()
    make: string

    @Column()
    model: string;

    @Column()
    year: Date

    @Column()
    mileage: number

    @Column()
    lng: number

    @Column()
    lat: number

    @Column({default: false})
    approved: boolean

    @ManyToOne(() => User, (user) => user.reports)
    user: User
}