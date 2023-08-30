import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { OrderDetailEntity } from 'src/order-details/entities/order-detail.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { OrderDetailsModule } from 'src/order-details/order-details.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, User]),
    forwardRef(() => UserModule),
    forwardRef(() => OrderDetailsModule),
    forwardRef(() => ProductModule)
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule]
})
export class OrderModule { }
