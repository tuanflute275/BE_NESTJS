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

  async create(createCategoryDto: CreateCategoryDto) {
    return await 'This action adds a new category';
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      // relations: {
      //   restaurant: true,
      // },
      where: { id: id },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await `This action updates a #${id} category`;
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
}
