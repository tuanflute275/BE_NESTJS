import { Module } from '@nestjs/common';
import { BlogCommentsService } from './blog_comments.service';
import { BlogCommentsController } from './blog_comments.controller';
import { BlogCommentEntity } from './entities/blog_comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogCommentEntity]),
    // forwardRef(() => ProductEntity)
  ],
  controllers: [BlogCommentsController],
  providers: [BlogCommentsService],
})
export class BlogCommentsModule { }
