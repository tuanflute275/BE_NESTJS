import { Module, forwardRef } from '@nestjs/common';
import { BlogCommentsService } from './blog_comments.service';
import { BlogCommentsController } from './blog_comments.controller';
import { BlogCommentEntity } from './entities/blog_comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { BlogEntity } from 'src/blog/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogCommentEntity, User]),
    forwardRef(() => BlogEntity)
  ],
  controllers: [BlogCommentsController],
  providers: [BlogCommentsService],
})
export class BlogCommentsModule { }
