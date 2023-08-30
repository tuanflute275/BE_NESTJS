import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/common/helpers/config';
import { extname } from 'path';

@Controller('blogs')
@ApiTags('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig('blog'),
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
    @Body() createBlogDto: CreateBlogDto,
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
    console.log(createBlogDto);
    console.log(file);
    return await this.blogService.create(user?.id, { ...createBlogDto, image: file.destination + '/' + file.filename });
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('query')
  async Query(@Req() request: Request) {

    const builder = this.blogService.queryBuilder('blogs');

    //filter
    if (request.query.title) {
      let title = request.query.title;
      builder.andWhere(`title LIKE '%${title}%'`);
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
