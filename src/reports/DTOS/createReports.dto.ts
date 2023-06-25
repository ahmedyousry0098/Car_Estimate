import {
    IsNumber, 
    IsString, 
    Min,
    Max,
    IsLongitude,
    IsLatitude,
} from 'class-validator'

export class CreateReportDTO {
    @IsNumber()
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2023)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1_000_000)
    mileage: number

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number
}