import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;
}
