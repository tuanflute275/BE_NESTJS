import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProductDTO: CreateProductDTO): Promise<CreateProductDTO> {
    return await this.productService.create(createProductDTO);
  }


  @UseGuards(AuthGuard)
  async findAll(){
    return await this.productService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO) {
    return await this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(+id);
  }
}
