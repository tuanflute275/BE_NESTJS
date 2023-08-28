import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty()
    @Expose()
    title: string;

    @IsNotEmpty()
    @Expose()
    image: string;

    @IsNotEmpty()
    @Expose()
    content: string;
}
