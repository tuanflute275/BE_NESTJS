import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request, Get, HttpStatus, HttpException, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import RegisterDto from './dto/Register.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/common/response/Response';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    public async register(@Body() registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createUser = await this.authService.create({
                ...registrationData,
                password: hashedPassword
            });
            return createUser;
        } catch (error) {
            return new Response(200, error.response, 'error');
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }


    @UseGuards(JwtAuthGuard)
    @Get('logout')
    logout(@Request() req) {
        let { id, user } = req.user;
        return this.authService.logOut(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        let { id, user } = req.user;
        const data = await this.authService.showUser(id);
        return data;
    }
}
