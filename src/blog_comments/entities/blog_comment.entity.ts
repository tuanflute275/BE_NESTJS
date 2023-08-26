import { BlogEntity } from "src/blog/entities/blog.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity('blog_comments')
export class BlogCommentEntity extends BaseEntity {

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
        type: 'text',
        nullable: false,
    })
    messages: string;

    @ManyToOne(() => BlogEntity, (blog) => blog.Blog_comments)
    blog?: BlogEntity;

    @ManyToOne(() => User, (user) => user.blog_comments)
    user?: User;
}
