import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product_comment.dto';
import { UpdateProductCommentDto } from './dto/update-product_comment.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductCommentEntity } from './entities/product_comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductCommentsService {

  @InjectRepository(ProductCommentEntity)
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  @InjectRepository(ProductCommentEntity)
  private readonly productCommentRepository: Repository<ProductCommentEntity>

  queryBuilder(query: string) {
    return this.productCommentRepository.createQueryBuilder(query);
  }


  async create(userId: number, createProductCommentDto: CreateProductCommentDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    console.log(user);

    try {
      const res = await this.productCommentRepository.save({
        ...createProductCommentDto, user
      })
      return await this.productCommentRepository.findOne({
        where: { id: res.id }
      });
    } catch (error) {
      throw new HttpException("Can not create blog", HttpStatus.BAD_REQUEST);
    }
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
