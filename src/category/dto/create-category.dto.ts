import { Expose } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @MinLength(3)
    @Expose()
    name: string;

    @IsNotEmpty()
    @Expose()
    status: number;
}
