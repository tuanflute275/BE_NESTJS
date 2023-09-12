import { BaseEntity } from "src/common/entities/base.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('carts')
export class Cart extends BaseEntity {

    @Column({
        type: 'integer',
        name: 'quantity',
    })
    quantity: number;

    @Column({
        type: 'float',
        name: 'total',
    })
    total: number;

    @ManyToOne(() => User, (user) => user.cart)
    user: User;

    @ManyToOne(() => ProductEntity, (product) => product.cart)
    product: ProductEntity;
}
