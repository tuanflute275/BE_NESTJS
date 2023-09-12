import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    forwardRef(() => ProductModule),
    forwardRef(() => UserModule),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
