import { Injectable } from '@nestjs/common';
import { CreateBlogCommentDto } from './dto/create-blog_comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog_comment.dto';
import { BlogCommentEntity } from './entities/blog_comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BlogCommentsService {

  @InjectRepository(BlogCommentEntity)
  private readonly blogCmtRepository: Repository<BlogCommentEntity>

  queryBuilder(query: string) {
    return this.blogCmtRepository.createQueryBuilder(query);
  }

  async create(createBlogCommentDto: CreateBlogCommentDto): Promise<CreateBlogCommentDto> {
    return this.blogCmtRepository.save(createBlogCommentDto);
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
