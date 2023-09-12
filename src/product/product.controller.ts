import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, UseGuards, Req, UploadedFile, BadRequestException, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/common/helpers/config';
import { extname } from 'path';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig('products'),
    fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname);
      const allowedExtArr = ['.jpg', '.png', '.jpeg'];
      if (!allowedExtArr.includes(ext)) {
        req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
        cb(null, false);
      } else {
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > 1024 * 1024 * 5) {
          req.fileValidationError = `File size is too large. Accepted file is less than 5MB`;
          cb(null, false);
        } else {
          cb(null, true);
        }
      }
    }
  }))
  async create(
    @Req() req: any,
    @Body() createProductDTO: CreateProductDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required')
    }

    let user = req['user_data'];
    console.log(user);
    console.log(createProductDTO);
    console.log(file);
    return await this.productService.create(user?.id, { ...createProductDTO, image: file.destination + '/' + file.filename });
  }

  @UseGuards(AuthGuard)
  @Get('query')
  async query(@Req() request: Request) {

    const builder = this.productService.queryBuilder('categories');

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
