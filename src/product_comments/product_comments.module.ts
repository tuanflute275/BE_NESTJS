import { ProductCommentEntity } from 'src/product_comments/entities/product_comment.entity';
import { Module } from '@nestjs/common';
import { ProductCommentsService } from './product_comments.service';
import { ProductCommentsController } from './product_comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCommentEntity]),
    // forwardRef(() => ProductEntity)
  ],
  controllers: [ProductCommentsController],
  providers: [ProductCommentsService],
})
export class ProductCommentsModule {}
