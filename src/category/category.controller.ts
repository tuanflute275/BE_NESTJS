import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Paging } from 'src/common/response/Paging';
import { Request } from 'express';
import { Response } from 'src/common/response/Response';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const dataCreate = await this.categoryService.create(createCategoryDto);
    return new Response(200, 'create success' ,dataCreate);
  }


  @Get()
  async findAll(
    @Req() request: Request
  ) {
    const paging = {
      page: 1,
      page_size: 3
    }

    const filters = {
      name: request.query.name || "",
      status: request.query.status || ""
    }
    const [listProduct, totalPage] = await this.categoryService.findAll(paging, filters);
    const pagingRes = new Paging(paging.page, paging.page_size, totalPage);
    return new Response(200, 'success',listProduct, pagingRes)
  }

  // async findAll(
  //   @Req() req: Request
  // ){
  //   const builder = (await this.categoryService.queryBuilder('categories'));

  //   //search
  //   if (req.query.keyWord) {
  //     builder.andWhere(`categories.name LIKE '%${req.query.keyWord}%'`);
  //   }

  //   // filter
  //   if (req.query.sort) {
  //     const sortQuery = req.query.sort;
  //     const sortArr = sortQuery.toString().split('-');
  //     builder.orderBy(
  //       `categories.${sortArr[0]}`,
  //       sortArr[1] == 'ASC' ? 'ASC' : 'DESC',
  //     );
  //   }

  //   //paginate
  //   const page: number = parseInt(req.query.page as any) || 1;
  //   const perpage: number = parseInt(req.query.limit as any) || 9;

  //   builder.offset((page - 1) * perpage).limit(perpage);
    
  //   return builder.getMany();
  // }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    const dataFindOne = await this.categoryService.findOne(+id);
    return new Response(200, 'success', dataFindOne)
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.categoryService.update(+id, updateCategoryDto);
    return new Response(200)
  }


  @Delete(':id')
  async sortDelete(@Param('id') id: number) {
    await this.categoryService.softDelete(+id);
    return new Response(200,'delete success')
  }


  @Get('recover/:id')
  async reStore(@Param('id') id: number) {
    await this.categoryService.reStore(+id);
    return new Response(200,'restore success')
  }


  @Get('delete/:id')
  async delete(@Param('id') id: number) {
    await this.categoryService.reStore(+id);
    return new Response(200,'delete official success')
  }
}
