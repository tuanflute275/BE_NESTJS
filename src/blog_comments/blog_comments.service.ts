import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogCommentDto } from './dto/create-blog_comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog_comment.dto';
import { BlogCommentEntity } from './entities/blog_comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BlogCommentsService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  @InjectRepository(BlogCommentEntity)
  private readonly blogCmtRepository: Repository<BlogCommentEntity>

  queryBuilder(query: string) {
    return this.blogCmtRepository.createQueryBuilder(query);
  }


  async create(userId: number, createBlogCommentDto: CreateBlogCommentDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    console.log(user);

    try {
      const res = await this.blogCmtRepository.save({
        ...createBlogCommentDto, user
      })
      return await this.blogCmtRepository.findOne({
        where: { id: res.id }
      });
    } catch (error) {
      throw new HttpException("Can not create blog", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<BlogCommentEntity[]>{
    return await this.blogCmtRepository.find();
  }

  async findOne(id: number): Promise<BlogCommentEntity> {
    return await this.blogCmtRepository.findOne({
      where: { id: id }
    });
  }

  async update(id: number, updateBlogCmtDto: UpdateBlogCommentDto): Promise<UpdateResult> {
    return await this.blogCmtRepository.update(id, updateBlogCmtDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.blogCmtRepository.delete(id);
  }
}
