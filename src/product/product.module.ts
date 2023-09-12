import { ProductCommentEntity } from './../product_comments/entities/product_comment.entity';
import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, User]),
    forwardRef(() => CategoryEntity),
    forwardRef(() => ProductCommentEntity),
    forwardRef(() => OrderEntity),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule]
})
export class ProductModule { }
