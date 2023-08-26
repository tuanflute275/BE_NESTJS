import { Controller, Get, Post, Body, Put, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'src/common/response/Response';
import { Paging } from 'src/common/response/Paging';



@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDTO) {
    try {
      return this.productService.create(createProductDto);
    } catch (e) {
      return e.response?.data;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const paging = {
      page: 1,
      page_size: 5
    }
    const [listProduct, totalPage] = await this.productService.findAll(paging);
    const pagingRes = new Paging(paging.page, paging.page_size, totalPage);
    return new Response(200, listProduct, 'success', pagingRes)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
