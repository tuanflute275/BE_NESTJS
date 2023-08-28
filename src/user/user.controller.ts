import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/common/helpers/config';
import { extname } from 'path';
import { Request } from 'express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request: Request) {

    const builder = this.userService.queryBuilder('users');

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
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return await this.userService.update(+id, updateDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(+id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar', { 
    storage: storageConfig('avatar') ,
    fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname);
      const allowedExtArr = ['.jpg', '.png', '.jpeg'];
      if(!allowedExtArr.includes(ext)){
        req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
        cb(null, false);
      }else{
        const fileSize = parseInt(req.headers['content-length']);
        if(fileSize > 1024 * 1024 * 5){
          req.fileValidationError = `File size is too large. Accepted file is less than 5MB`;
          cb(null, false);
        }else{
          cb(null, true);
        }
      }
    }
  }))
  @Post('upload-avatar')
  async uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    // console.log('user data', req.user_data) // khi verify token đã lấy ra 
    if(req.fileValidationError){
      throw new BadRequestException(req.fileValidationError);
    }
    if(!file){
      throw new BadRequestException('File is required')
    }
    return await this.userService.updateAvatar(req.user_data.id, file.destination + '/' + file.filename);
  }
}
