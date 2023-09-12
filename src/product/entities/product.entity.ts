import { BrandEntity } from 'src/brand/entities/brand.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { OrderDetailEntity } from 'src/order-details/entities/order-detail.entity';
import { ProductCommentEntity } from 'src/product_comments/entities/product_comment.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity {

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    content: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    image: string;

    @Column({
        type: 'float',
        nullable: false,
    })
    price: number;

    @Column({
        type: 'float',
        nullable: true,
        default: 0,
    })
    sale_price: number;

    @Column({
        type: 'tinyint',
        default: 1,
    })
    status: number;

    @Column({
        type: 'text',
    })
    description: string;

    @ManyToOne(() => CategoryEntity, (cate) => cate.products)
    category?: CategoryEntity;

    @ManyToOne(() => BrandEntity, (brand) => brand.products)
    brand?: BrandEntity;

    @OneToMany(() => Cart, (cart) => cart.product)
    cart: Cart[];

    @OneToMany(() => ProductCommentEntity, (pro_cmt) => pro_cmt.products)
    pro_comments: ProductCommentEntity[];

    @OneToMany(()=>OrderDetailEntity,(ord_detail)=>ord_detail.products)
    ord_details: OrderDetailEntity[];
}