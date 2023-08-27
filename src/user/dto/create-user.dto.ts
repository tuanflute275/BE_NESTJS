import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Expose()
    password: string;
}
