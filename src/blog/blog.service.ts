import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BlogService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  @InjectRepository(BlogEntity)
  private readonly blogRepository: Repository<BlogEntity>

  queryBuilder(query: string) {
    return this.blogRepository.createQueryBuilder(query);
  }

  async create(userId: number, createBlogDto: CreateBlogDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    console.log(user);

    try {
      const res = await this.blogRepository.save({
        ...createBlogDto, user
      })
      return await this.blogRepository.findOne({
        where: { id: res.id }
      });
    } catch (error) {
      throw new HttpException("Can not create blog", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<BlogEntity[]> {
    return await this.blogRepository.find();
  }

  async findOne(id: number): Promise<BlogEntity> {
    return await this.blogRepository.findOne({
      where: { id: id }
    });
  }

  async update(id: number, updateCategoryDto: UpdateBlogDto) {
    return await this.blogRepository.update(id, updateCategoryDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.blogRepository.delete(id);
  }
}
