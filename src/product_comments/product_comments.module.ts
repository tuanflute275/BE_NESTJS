import { ProductCommentEntity } from 'src/product_comments/entities/product_comment.entity';
import { Module, forwardRef } from '@nestjs/common';
import { ProductCommentsService } from './product_comments.service';
import { ProductCommentsController } from './product_comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCommentEntity, User]),
    forwardRef(() => ProductEntity),
  ],
  controllers: [ProductCommentsController],
  providers: [ProductCommentsService],
})
export class ProductCommentsModule { }
