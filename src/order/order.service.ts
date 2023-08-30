import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { OrderDetailEntity } from 'src/order-details/entities/order-detail.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepo: Repository<OrderDetailEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    console.log("Order Data: ", createOrderDto);

    const userFound = await this.userRepo.findOne({
      where: {
        id: createOrderDto.userId
      }
    });
    console.log("User Found: ", userFound);

    const order = new OrderEntity();

    order.firstName = createOrderDto.firstName;
    order.lastName = createOrderDto.lastName;
    order.company_name = createOrderDto.company_name;
    order.country = createOrderDto.country;
    order.street_address = createOrderDto.street_address;
    order.postcode_zip = createOrderDto.postcode_zip;
    order.town_city = createOrderDto.town_city;
    order.email = createOrderDto.email;
    order.phone = createOrderDto.phone;
    order.user = userFound;

    const savedOrder = await this.orderRepo.save(order);

    const orderDetails = createOrderDto.carts.map((cart) => {
      console.log("Cart: ", cart);

      const orderDetail = new OrderDetailEntity();
      orderDetail.total = +cart.total;
      orderDetail.quantity = +cart.quantity;
      orderDetail.products = cart.products;
      orderDetail.order = savedOrder;

      return orderDetail;
    });
    await this.orderDetailRepo.save(orderDetails);

    return savedOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
