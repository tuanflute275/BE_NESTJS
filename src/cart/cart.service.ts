import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  async getAllCartByUser(userId: number) {
    const userFound = await this.userRepository.findOne({
      where: { id: userId }
    });

    console.log('user found', userFound)

    const carts = await this.cartRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: true,
      },
    });

    console.log('this is cart service',carts)

    const result = await this.cartRepository
    .createQueryBuilder('cart')
    .select('SUM(cart.total)', 'total')
    .getRawOne();

    console.log('this is result service' ,result)


  return {
    carts,
    result,
  };
  }

  async saveToCart(addToCartDTO: CreateCartDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: addToCartDTO.userId,
      },
    });
    const productFound = await this.productRepository.findOne({
      where: {
        id: addToCartDTO.productId,
      },
    });

    // console.log('product ', productFound)
    const cartFound = await this.cartRepository.findOne({
      where: {
        product: productFound,
      },
    });

    // console.log('cartFound ', cartFound)
    if (cartFound) {
      return this.cartRepository.update(cartFound, {
        quantity: cartFound.quantity + 1,
        total:
          productFound.sale_price > 0
            ? productFound.sale_price * (cartFound.quantity + 1)
            : productFound.price * (cartFound.quantity + 1),
      });
    }

    const newCart = await this.cartRepository.create({
      ...addToCartDTO,
      user: userFound,
      product: productFound,
      total:
        productFound.sale_price > 0
          ? productFound.sale_price * addToCartDTO.quantity
          : productFound.price * addToCartDTO.quantity,
    });

    return await this.cartRepository.save(newCart);

  }

  async changeQuantity(updateCartDTO: UpdateCartDto): Promise<UpdateResult> {
    console.log('Service: ', updateCartDTO);

    const userFound = await this.userRepository.findOne({
      where: {
        id: updateCartDTO.userId,
      },
    });

    const productFound = await this.productRepository.findOne({
      where: {
        id: updateCartDTO.prodId,
      },
    });
    console.log(productFound);

    const cartFound = await this.cartRepository.findOne({
      where: {
        product: productFound,
        user: userFound,
      },
    });
    console.log(cartFound);

    const newData = {
      quantity: updateCartDTO.quantity,
      total:
        productFound.sale_price == 0
          ? productFound.price * updateCartDTO.quantity
          : productFound.sale_price * updateCartDTO.quantity,
    };
    console.log('New Cart Data', newData);

    const newCart = await this.cartRepository.update(cartFound.id, {
      quantity: newData.quantity,
      total: newData.total,
    });

    console.log(newCart);
    return newCart;
  }

  async removeFromCart(cartId: string) {
    return this.cartRepository.delete(cartId);
  }

  async removeAllCartByUser(userId: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: +userId,
      },
    });

    return await this.cartRepository.delete({
      user: userFound,
    });
  }
}
