import { CategoryEntity } from 'src/category/entities/category.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    pro_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    pro_slug: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    pro_image: string;

    @Column({
        type: 'float',
        nullable: false,
    })
    pro_price: number;

    @Column({
        type: 'float',
        nullable: true,
        default: 0,
    })
    pro_sale_price: number;

    @Column({
        type: 'tinyint',
        default: 1,
    })
    pro_status: number;

    @Column({
        type: 'text',
    })
    pro_description: string;

    @ManyToOne(() => CategoryEntity, (cate) => cate.products)
    category?: CategoryEntity;

    // @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.products)
    // restaurant: RestaurantEntity;

    // @OneToMany(() => OrderDeatailsEntity, (order_detail) => order_detail.product)
    // order_details: OrderDeatailsEntity[];

    // @OneToMany(() => Cart, (cart) => cart.product)
    // carts: Cart[];
}