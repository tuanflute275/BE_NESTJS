import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.access_token_time }
    })
  ],
  providers: [AuthService, JwtService, UserService],
  controllers: [AuthController]
})
export class AuthModule { }
