import { BaseEntity } from "src/common/entities/base.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity('product_comments')
export class ProductCommentEntity extends BaseEntity {
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
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    messages: string;

    @ManyToOne(() => ProductEntity, (product) => product.pro_comments)
    products?: ProductEntity;

    @ManyToOne(()=>User, (user)=>user.pro_cmt)
    users?: User[];
}
