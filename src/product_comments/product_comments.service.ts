import { Injectable } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product_comment.dto';
import { UpdateProductCommentDto } from './dto/update-product_comment.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductCommentEntity } from './entities/product_comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCommentsService {

  @InjectRepository(ProductCommentEntity)
  private readonly productCommentRepository: Repository<ProductCommentEntity>

  queryBuilder(query: string) {
    return this.productCommentRepository.createQueryBuilder(query);
  }

  async create(createProductCommentDto: CreateProductCommentDto): Promise<CreateProductCommentDto> {
    return this.productCommentRepository.save(createProductCommentDto);
  }

  async findAll() {
    return await this.productCommentRepository.find({
      relations: {
        users: true,
      }
    });
  }

  async findOne(id: number): Promise<ProductCommentEntity> {
    return await this.productCommentRepository.findOne({
      where: { id: id }
    });
  }

  async update(id: number, updateProCmtDto: UpdateProductCommentDto): Promise<UpdateResult> {
    return await this.productCommentRepository.update(id, updateProCmtDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.productCommentRepository.delete(id);
  }
}
