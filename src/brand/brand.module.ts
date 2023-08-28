import { BrandEntity } from 'src/brand/entities/brand.entity';
import { Module, forwardRef } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandEntity]),
    forwardRef(() => ProductEntity)
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
