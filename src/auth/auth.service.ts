import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import RegisterDto from './dto/Register.dto';
import * as bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user) {
            const isMatchPassword = await bcrypt.compare(pass, user.password);
            if (isMatchPassword === true) {
                const { password, ...result } = user;
                return result;
            }
            throw new HttpException(`${pass} không chính xác`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        throw new HttpException(`${username} không tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async login(user: any) {
        const payload = { username: user.phone, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '27h', secret: jwtConstants.secret }),
        }
    }

    async logOut(userId: number) {
        console.log('userId', userId)

        return this.usersService.update(userId, {
            access_token: null,
        });
    }

    async create(userDto: RegisterDto) {

        //check unique
        const checkUsername = await this.usersService.findByUsername(userDto.username);
        if (checkUsername) {
            throw new HttpException(`${userDto.username} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const checkEmail = await this.usersService.findByEmail(userDto.email);
        if (checkEmail) {
            throw new HttpException(`${userDto.email} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const checkPhone = await this.usersService.findByPhone(userDto.phone);
        if (checkPhone) {
            throw new HttpException(`${userDto.phone} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const user = await this.usersService.register(userDto);
        if (user) {
            return await this.login(user);
        }
        throw new HttpException('Error create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async showUser(id: number) {
        return await this.usersService.findById(id);
    }
}
