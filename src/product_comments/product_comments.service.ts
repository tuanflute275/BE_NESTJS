import { Injectable } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product_comment.dto';
import { UpdateProductCommentDto } from './dto/update-product_comment.dto';

@Injectable()
export class ProductCommentsService {
  create(createProductCommentDto: CreateProductCommentDto) {
    return 'This action adds a new productComment';
  }

  findAll() {
    return `This action returns all productComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productComment`;
  }

  update(id: number, updateProductCommentDto: UpdateProductCommentDto) {
    return `This action updates a #${id} productComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} productComment`;
  }
}
