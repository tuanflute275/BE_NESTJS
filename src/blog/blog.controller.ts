import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('blog')
@ApiTags('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.create(createBlogDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async Query(@Req() request: Request) {

    const builder = this.blogService.queryBuilder('categories');

    //filter
    if (request.query.name) {
      let name = request.query.name;
      builder.andWhere(`name LIKE '%${name}%'`);
    }

    //sort
    if (request.query._sort) {
      let sortString = request.query._sort;
      let sort_arr = sortString.toString().split('-');
      builder.orderBy(sort_arr[0], sort_arr[1] == 'ASC' ? 'ASC' : 'DESC');
    }

    // paginate
    if (request.query.page || request.query.limit) {
      const page: number = parseInt(request.query.page as any) || 1;
      const perPage: number = parseInt(request.query.limit as any) || 1;

      builder.offset((page - 1) * perPage).limit(perPage);
    }

    return await builder.getMany();
  }

  @UseGuards(AuthGuard)
  @Get('query')
  async query() {
    return await this.blogService.findAll();
  }

  @UseGuards(AuthGuard)
  async findAll(){
    return await this.blogService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.blogService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return await this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.blogService.delete(+id);
  }
}
