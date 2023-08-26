import { BaseEntity } from "src/common/entities/base.entity";
import { OrderDetailEntity } from "src/order-details/entities/order-detail.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('orders')
export class OrderEntity extends BaseEntity{
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    company_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    country: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    street_address: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    postcode_zip: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    town_city: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    email: string;
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    phone: string;

    // @OneToMany(() => ProductEntity, (product) => product.category)
    // products: ProductEntity[];

    @OneToMany(()=>OrderDetailEntity, (ord_details)=>ord_details.order)
    orderDetails: OrderDetailEntity[] ;
}
