import { BlogCommentEntity } from 'src/blog_comments/entities/blog_comment.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('blogs')
export class BlogEntity extends BaseEntity {

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    image: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    category: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    content: string;

    @OneToMany(() => BlogCommentEntity, (blogCmt) => blogCmt.blog)
    Blog_comments: BlogCommentEntity[];

    @ManyToOne(() => User, (user) => user.blog)
    user?: User;
}
