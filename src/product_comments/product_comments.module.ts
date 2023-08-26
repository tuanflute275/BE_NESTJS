import { Module } from '@nestjs/common';
import { ProductCommentsService } from './product_comments.service';
import { ProductCommentsController } from './product_comments.controller';

@Module({
  controllers: [ProductCommentsController],
  providers: [ProductCommentsService],
})
export class ProductCommentsModule {}
