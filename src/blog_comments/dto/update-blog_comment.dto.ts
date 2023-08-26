import { PartialType } from '@nestjs/swagger';
import { CreateBlogCommentDto } from './create-blog_comment.dto';

export class UpdateBlogCommentDto extends PartialType(CreateBlogCommentDto) {}
