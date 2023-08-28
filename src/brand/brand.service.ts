import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BrandService {
  @InjectRepository(BrandEntity)
  private readonly brandRepository: Repository<BrandEntity>

  queryBuilder(query: string) {
    return this.brandRepository.createQueryBuilder(query);
  }

  async create(createBrandDto: CreateBrandDto): Promise<CreateBrandDto> {
    return this.brandRepository.save(createBrandDto);
  }

  async findAll(): Promise<BrandEntity[]>{
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<BrandEntity> {
    return await this.brandRepository.findOne({
      where: { id: id }
    });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    return await this.brandRepository.update(id, updateBrandDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.brandRepository.delete(id);
  }
}
