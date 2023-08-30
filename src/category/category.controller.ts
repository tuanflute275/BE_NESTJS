import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto> {
    return await this.categoryService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(){
    return await this.categoryService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('query')
  async query(@Req() request: Request) {

    const builder = this.categoryService.queryBuilder('categories');

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
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoryService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categoryService.delete(+id);
  }
}
