import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { OrderDetailEntity } from "src/order-details/entities/order-detail.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    company_name: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    country: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    street_address: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    postcode_zip: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    town_city: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    phone: string;

    @Expose()
    userId: number;

    @Expose()
    carts: OrderDetailEntity[];
}
