import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntity]),
    // forwardRef(() => ProductEntity)
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
