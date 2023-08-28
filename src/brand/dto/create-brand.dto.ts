import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateBrandDto {
    @IsNotEmpty()
    @Expose()
    name: string;
}
