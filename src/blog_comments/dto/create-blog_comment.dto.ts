import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateBlogCommentDto {
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNotEmpty()
    @Expose()
    message: string;
}
