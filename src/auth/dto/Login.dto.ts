import { IsEmail, IsNotEmpty, IsString,MinLength } from "class-validator";

class LoginDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export default LoginDto;