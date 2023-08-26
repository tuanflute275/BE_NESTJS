import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min, MinLength } from "class-validator";
export class UpdateProductDTO {
    @IsNotEmpty()
    @MinLength(3)
    @Expose()
    pro_name: string;

    @IsNotEmpty()
    @MinLength(3)
    @Expose()
    pro_slug: string;

    @Expose()
    pro_image: string;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @Expose()
    pro_price: number;

    @Min(0)
    @Type(() => Number)
    @Expose()
    pro_sale_price: number;

    @IsNotEmpty()
    @Expose()
    pro_status: number;

    @Expose()
    pro_description: string;

    categoryId: number;
};