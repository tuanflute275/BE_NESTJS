import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('user')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateInfo(
    @Request() req,
    @Body() userUpdate :any
  ) {
    const {id, user} = req.user;
    return await this.userService.updateInfo(id, userUpdate)
  }



  // async updateUserData(
  //   @Req() req: Request,
  //   @Param('userID') userID: string,
  //   @Body() userData: UpdateUserDto,
  //   @UploadedFile()
  //   image: Express.Multer.File,
  // ): Promise<UpdateResult> {
  //   const user_found = await this.userService.findById(userID);
  //   console.log('user_found', user_found);
  //   let avatar_name = user_found.avatar;
  //   if (image && user_found.avatar != '') {
  //     const filePath = user_found.avatar.replace(
  //       'http://localhost:8000/uploads/',
  //       '',
  //     );
  //     unlinkSync('./src/public/uploads/' + filePath);
  //     avatar_name = `http://${req.get('host')}/uploads/${image.filename}`;
  //   }
  //   if (image && user_found.avatar == '') {
  //     avatar_name = `http://${req.get('host')}/uploads/${image.filename}`;
  //   }
  //   // console.log('User Data In Controller: ', userData);
  //   userData.avatar = avatar_name;
  //   return await this.userService.update(userID, userData);
  // }
}
