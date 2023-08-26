import { ProductEntity } from 'src/product/entities/product.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    c_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    c_slug: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    c_avatar: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    c_banner: string;


    @Column({
        type: 'tinyint',
        default: 1,
    })
    c_status: number;

    // @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.products)
    // restaurant: RestaurantEntity;

    // @OneToMany(() => ProductEntity, (product) => product.pro_name)
    // category: ProductEntity[];

    // @OneToMany(() => Cart, (cart) => cart.product)
    // carts: Cart[];

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];
}