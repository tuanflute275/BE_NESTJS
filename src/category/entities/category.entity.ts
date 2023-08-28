import { BaseEntity } from 'src/common/entities/base.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity{

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];
}