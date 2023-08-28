import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BlogService {

  @InjectRepository(BlogEntity)
  private readonly blogRepository: Repository<BlogEntity>

  queryBuilder(query: string) {
    return this.blogRepository.createQueryBuilder(query);
  }

  async create(createBlogDto: CreateBlogDto): Promise<CreateBlogDto> {
    return this.blogRepository.save(createBlogDto);
  }

  async findAll(): Promise<BlogEntity[]>{
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
