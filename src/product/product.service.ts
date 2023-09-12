import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/common/response/Response';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class ProductService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  @InjectRepository(ProductEntity)
  private readonly productRepository: Repository<ProductEntity>

  queryBuilder(query: string) {
    return this.productRepository.createQueryBuilder(query);
  }

  async create(userId: number, createProductDto: CreateProductDTO) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    try {
      const res = await this.productRepository.save({
        ...createProductDto, user
      })
      return await this.productRepository.findOne({
        where: { id: res.id }
      });
    } catch (error) {
      throw new HttpException("Can not create blog", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<ProductEntity[]>{
    return await this.productRepository.find({
      relations:{
        category: true,
        brand: true
      }
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateProductDto: UpdateProductDTO) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
