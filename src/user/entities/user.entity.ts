import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { LevelEnum } from "../enums/level.enum";

@Unique(["email"])
@Unique(["username"])
@Unique(["phone"])
@Entity('users')
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

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
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true
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
        nullable: false,
        unique: true
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    avatar: string;

    @Column({
        type: 'enum',
        default: LevelEnum.USER,
        enum: LevelEnum
    })
    level: string;
}
