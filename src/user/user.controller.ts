import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query, Req, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'src/common/response/Response';
import { FilterUserDto } from './dto/filter-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/common/helpers/config';
import { extname } from 'path';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: FilterUserDto): Promise<User[]> {
    console.log(query)
    return await this.userService.findAll(query);
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
    await this.userService.update(+id, updateDto);
    return new Response(200)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async sortDelete(@Param('id') id: number) {
    await this.userService.softDelete(+id);
    return new Response(200, 'delete success')
  }

  @UseGuards(AuthGuard)
  @Get('recover/:id')
  async reStore(@Param('id') id: number) {
    await this.userService.reStore(+id);
    return new Response(200, 'restore success')
  }

  @UseGuards(AuthGuard)
  @Get('delete/:id')
  async delete(@Param('id') id: number) {
    await this.userService.reStore(+id);
    return new Response(200, 'delete official success')
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
    await this.userService.updateAvatar(req.user_data.id, file.destination + '/' + file.filename);
    return new Response(200, 'uploads avatar success')
  }
}
