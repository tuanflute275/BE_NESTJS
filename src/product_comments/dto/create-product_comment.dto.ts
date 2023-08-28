import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProductCommentDto {
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNotEmpty()
    @Expose()
    messages: string;
}
