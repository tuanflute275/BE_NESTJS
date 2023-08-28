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
import { APP_FILTER } from '@nestjs/core';
import { BrandModule } from './brand/brand.module';
import { BrandEntity } from './brand/entities/brand.entity';
import { ProductCommentsModule } from './product_comments/product_comments.module';
import { BlogModule } from './blog/blog.module';
import { BlogCommentsModule } from './blog_comments/blog_comments.module';
import { BlogEntity } from './blog/entities/blog.entity';
import { BlogCommentEntity } from './blog_comments/entities/blog_comment.entity';
import { OrderDetailEntity } from './order-details/entities/order-detail.entity';
import { OrderEntity } from './order/entities/order.entity';
import { ProductCommentEntity } from './product_comments/entities/product_comment.entity';

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
        BrandEntity,
        BlogEntity,
        BlogCommentEntity,
        OrderEntity,
        OrderDetailEntity,
        ProductEntity,
        ProductCommentEntity,
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
    BrandModule,
    ProductCommentsModule,
    BlogModule,
    BlogCommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
