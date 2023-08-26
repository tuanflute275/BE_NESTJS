import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    @UseInterceptors()
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        storage: diskStorage({
            destination: './uploads/image/'
        })
        console.log(file);
    }
}
