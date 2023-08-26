import { BaseEntity } from 'src/common/entities/base.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('brands')
export class BrandEntity extends BaseEntity{

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'tinyint',
        default: 1,
    })
    status: number;

    @OneToMany(() => ProductEntity, (product) => product.brand)
    products: ProductEntity[];
}