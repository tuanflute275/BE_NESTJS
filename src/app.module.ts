import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { User } from './user/entities/user.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { ProductEntity } from './product/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import * as Joi from '@hapi/joi';
import { ExceptionsLoggerFilter } from './ultils/exceptionsLogger.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'root',
      password: '',
      database: process.env.MYSQL_DB || '1st_semester_project',
      entities: [
        User,
        CategoryEntity,
        ProductEntity
      ],
      autoLoadEntities: true,
      synchronize: true,
      // validationSchema: Joi.object({
      //   UPLOADED_FILES_DESTINATION: Joi.string().required(),
      // })
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    OrderDetailsModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter
    }
  ],
})
export class AppModule {}
