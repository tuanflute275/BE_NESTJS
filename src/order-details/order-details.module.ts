import { Module, forwardRef } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetailEntity]),
    forwardRef(() => OrderModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [TypeOrmModule]
})
export class OrderDetailsModule { }
