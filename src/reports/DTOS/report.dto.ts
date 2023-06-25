import {Expose, Transform} from 'class-transformer'

export class ReportDTO {
    @Expose()
    id: string

    @Expose()
    price: number

    @Expose()
    make: string

    @Expose()
    model: string;

    @Expose()
    year: Date

    @Expose()
    mileage: number

    @Expose()
    lng: number

    @Expose()
    lat: number

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: string
}