import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/common/response/Response';


@Injectable()
export class ProductService {

  @InjectRepository(ProductEntity)
  private readonly productRepository: Repository<ProductEntity>


  async create(createProductDto: CreateProductDTO): Promise<CreateProductDTO> {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(paging: any) {

    return await this.productRepository.findAndCount({
      take: paging.page_size,
      skip: (paging.page - 1)
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

  async remove(id: number) {
    const deleted = await this.productRepository.delete(id);
    return new Response(200, deleted, 'delete success');
  }
}
