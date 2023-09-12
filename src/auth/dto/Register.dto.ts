import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, MinLength } from "class-validator";

class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}

export default RegisterDto;