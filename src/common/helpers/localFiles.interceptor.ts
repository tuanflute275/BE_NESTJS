import { FileInterceptor } from '@nestjs/platform-express';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Type, mixin } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

interface LocalFilesInterceptorOption {
    filename: string;
    path?: string;
}

function LocalFilesInterceptor(option: LocalFilesInterceptorOption): Type<NestInterceptor> {
    @Injectable()
    class Interceptor implements NestInterceptor {
        fileInterceptor: NestInterceptor;
        constructor(configService: ConfigService) {
            const filesDestination = configService.get('UPLOADED_FILES_DESTINATION');

            const destination = `${filesDestination}${option.path}`;

            const multerOptions: MulterOptions = {
                storage: diskStorage({
                    destination
                })
            }
            this.fileInterceptor = new (FileInterceptor(option.filename, multerOptions));
        }
        intercept(...args: Parameters<NestInterceptor['intercept']>) {
            return this.fileInterceptor.intercept(...args);
        }
    }
    return mixin(Interceptor);
}

export default LocalFilesInterceptor;