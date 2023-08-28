import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  
  queryBuilder(query: string) {
    return this.userRepository.createQueryBuilder(query);
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({
      where: {
        name: name
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
  
  async updateAvatar(id: number, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { avatar })
  }

  async findAll(): Promise<User[]>{
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id
      }
    })
  }

  async create(createDto: CreateUserDto): Promise<User> {
    console.log('createDto', createDto)
    const hashPassword = await bcrypt.hash(createDto.password, 10)
    return await this.userRepository.save(createDto);
  }

  async update(id: number, updateDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateDto);
  }
  
  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
