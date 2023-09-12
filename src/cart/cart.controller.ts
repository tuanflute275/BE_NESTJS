import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateResult } from 'typeorm';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: any) {
    let userId = req['user_data'].id;
    return this.cartService.getAllCartByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async saveDataToCart(@Body() saveToCart: CreateCartDto) {
    return await this.cartService.saveToCart(saveToCart);
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateDataToCart(
    @Body() updateDataToCart: UpdateCartDto,
  ): Promise<UpdateResult> {
    console.log('Controller', updateDataToCart);

    return await this.cartService.changeQuantity(updateDataToCart);
  }

  @UseGuards(AuthGuard)
  @Delete(':cartId')
  async deleteDataFromCart(@Param('cartId') cartId: string) {
    return await this.cartService.removeFromCart(cartId);
  }

  @UseGuards(AuthGuard)
  @Delete('user/:userId')
  async deleteDataFromCartByUser(@Param('userId') userId: string) {
    return await this.cartService.removeAllCartByUser(userId);
  }
}
