import { PartialType } from '@nestjs/swagger';
import { CreateProductCommentDto } from './create-product_comment.dto';

export class UpdateProductCommentDto extends PartialType(CreateProductCommentDto) {}
