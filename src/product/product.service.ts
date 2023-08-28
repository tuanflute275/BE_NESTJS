import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/common/response/Response';


@Injectable()
export class ProductService {

  @InjectRepository(ProductEntity)
  private readonly productRepository: Repository<ProductEntity>


  async create(createProductDto: CreateProductDTO): Promise<CreateProductDTO> {
    return await this.productRepository.save(createProductDto);
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
