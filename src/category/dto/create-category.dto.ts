import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @Expose()
    name: string;
}
