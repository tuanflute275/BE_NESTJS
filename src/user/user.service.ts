import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import RegisterDto from 'src/auth/dto/Register.dto';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username: username
      }
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async findByPhone(phone: string) {
    return await this.userRepository.findOne({
      where: {
        phone: phone
      }
    });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async updateInfo(id: number, userUpdate: any) {
    console.log(userUpdate, id);
    await this.userRepository.update(id, userUpdate);
    return await this.findById(id);
  }

  async register(userRegister: RegisterDto) {
    const newData = await this.userRepository.create(userRegister);
    return await this.userRepository.save(newData);
  }


  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ) {
    console.log('id UserService', id)
    console.log('updateUserDto UserService', updateUserDto)
    // return await this.userRepository.findOne({
    //   where: {
    //     id: id
    //   }
    // });

    // console.log('userdataaaa', userData)

    // return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(+id);
  }
}
