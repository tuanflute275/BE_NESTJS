import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {

  @InjectRepository(CategoryEntity)
  private readonly categoryRepository: Repository<CategoryEntity>

  queryBuilder(query: string) {
    return this.categoryRepository.createQueryBuilder(query);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto> {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<CategoryEntity[]>{
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      where: { id: id }
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
}
