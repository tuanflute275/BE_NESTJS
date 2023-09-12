import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import RegisterDto from './dto/Register.dto';
import * as bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import LoginDto from './dto/Login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>

    ) { }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (user) {
            const checkPass = bcrypt.compareSync(loginDto.password, (await user).password);
            if (!checkPass) {
                throw new HttpException("Password is not correct", HttpStatus.UNAUTHORIZED);
            }
            //generate access_token and refresh_token
            const payload = { id: (await user).id, name: (await user).name, email: (await user).email, level: user.level };
            return this.generateToken(payload);
        }
        throw new HttpException(`Email is not exits`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private async generateToken(payload: { id: number, email: string }) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: jwtConstants.access_token_time
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: jwtConstants.refresh_token_time
        });
        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token }
        )
        return {
            access_token,
            refresh_token
        }
    }

    async register(userDto: RegisterDto): Promise<User> {

        //check unique

        const checkEmail = await this.usersService.findByEmail(userDto.email);
        if (checkEmail) {
            throw new HttpException(`${userDto.email} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const checkPhone = await this.usersService.findByPhone(userDto.phone);
        if (checkPhone) {
            throw new HttpException(`${userDto.phone} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return await this.userRepository.save({ ...userDto, refresh_token: "refresh_token_string" });
    }

    async refreshToken(refresh_token: string): Promise<any> {
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: jwtConstants.secret,
            });
            const checkExitsToken = await this.userRepository.findOneBy({ email: verify.email, refresh_token })
            if (checkExitsToken) {
                return this.generateToken({ id: verify.id, email: verify.email })
            } else {
                throw new HttpException("Refresh token is not valid", HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException("Refresh token is not valid", HttpStatus.BAD_REQUEST);
        }
    }

}
