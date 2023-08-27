import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import RegisterDto from 'src/auth/dto/Register.dto';
import * as bcrypt from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

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

  //

  async findAll(query: FilterUserDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || "";
    const [res, total] = await this.userRepository.findAndCount({
      where: [
        { name: Like('%' + keyword + '%') },
        { email: Like('%' + keyword + '%') },
      ],
      take: items_per_page,
      skip: skip
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage
    }
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

  async softDelete(id: number) {
    return this.userRepository.softDelete(id);
  }

  async reStore(id: number): Promise<DeleteResult> {
    return this.userRepository.restore(id);
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
