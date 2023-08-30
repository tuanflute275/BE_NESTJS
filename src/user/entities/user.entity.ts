import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { LevelEnum } from "../enums/level.enum";
import { BaseEntity } from "src/common/entities/base.entity";
import { BlogCommentEntity } from "src/blog_comments/entities/blog_comment.entity";
import { BlogEntity } from "src/blog/entities/blog.entity";
import { ProductCommentEntity } from "src/product_comments/entities/product_comment.entity";
import { OrderEntity } from "src/order/entities/order.entity";

@Unique(["email"])
@Unique(["phone"])
@Entity('users')
export class User extends BaseEntity {

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null
    })
    refresh_token: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null
    })
    avatar: string;

    @Column({
        type: 'enum',
        default: LevelEnum.USER,
        enum: LevelEnum
    })
    level: string;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

    @OneToMany(() => BlogEntity, (blog) => blog.user)
    blog: BlogEntity[];

    @OneToMany(() => BlogCommentEntity, (blogCmt) => blogCmt.user)
    blog_comments: BlogCommentEntity[];

    @OneToMany(() => ProductCommentEntity, (pro_cmt) => pro_cmt.users)
    pro_cmt: ProductCommentEntity[];
}
