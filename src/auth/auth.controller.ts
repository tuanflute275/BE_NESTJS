import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request, Get, HttpStatus, HttpException, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RegisterDto from './dto/Register.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/common/response/Response';
import LoginDto from './dto/Login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    public async register(@Body() registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createUser = await this.authService.register({
                ...registrationData,
                password: hashedPassword
            });
            return createUser;
        } catch (error) {
            return new Response(200, error.response, 'error');
        }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto);
    }

    @Post('refresh-token')
    async refreshToken(@Body() { refresh_token }): Promise<any> {
        return await this.authService.refreshToken(refresh_token);
    }

}
