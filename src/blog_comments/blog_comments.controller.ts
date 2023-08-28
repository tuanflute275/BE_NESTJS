import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BlogCommentsService } from './blog_comments.service';
import { CreateBlogCommentDto } from './dto/create-blog_comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog_comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('blog_comments')
@ApiTags('blog-comments')
export class BlogCommentsController {
  constructor(private readonly blogCommentsService: BlogCommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBlogCommentDto: CreateBlogCommentDto) {
    return await this.blogCommentsService.create(createBlogCommentDto);
  }

  @UseGuards(AuthGuard)
  @Get('query')
  async query(@Req() request: Request) {

    const builder = this.blogCommentsService.queryBuilder('blog_comments');

    //filter
    if (request.query.name) {
      console.log(request.query.name);
      let name = request.query.name;
      builder.andWhere(`name LIKE '%${name}%'`);
    }

    //sort
    if (request.query._sort) {
      let sortString = request.query._sort;
      let sort_arr = sortString.toString().split('-');
      console.log(sort_arr);
      builder.orderBy(sort_arr[0], sort_arr[1] == 'ASC' ? 'ASC' : 'DESC');
    }

    // paginate
    if (request.query.page || request.query.limit) {
      const page: number = parseInt(request.query.page as any) || 1;
      const perPage: number = parseInt(request.query.limit as any) || 1;

      builder.offset((page - 1) * perPage).limit(perPage);
    }

    console.log(builder.getQuery());
    return await builder.getMany();
  }

  @UseGuards(AuthGuard)
  async findAll(){
    return await this.blogCommentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.blogCommentsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBlogCommentDto: UpdateBlogCommentDto) {
    return await this.blogCommentsService.update(+id, updateBlogCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.blogCommentsService.delete(+id);
  }
}
