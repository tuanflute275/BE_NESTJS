import { Module } from '@nestjs/common';
import { BlogCommentsService } from './blog_comments.service';
import { BlogCommentsController } from './blog_comments.controller';

@Module({
  controllers: [BlogCommentsController],
  providers: [BlogCommentsService],
})
export class BlogCommentsModule {}
