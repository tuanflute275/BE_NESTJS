import { BaseEntity } from "src/common/entities/base.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('order_details')
export class OrderDetailEntity extends BaseEntity {
    @Column({
        type: 'int',
        nullable: false,
    })
    quantity: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    total: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderDetails, {
        onDelete: 'CASCADE',
    })
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, (product) => product.ord_details)
    products: ProductEntity;
}
