import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty()
    @Expose()
    title: string;

    @Expose()
    image: string;

    @IsNotEmpty()
    @Expose()
    content: string;
}
