import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        name: 'create_at'
    })
    createAt: Date;

    @UpdateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        name: 'update_at'
    })
    updateAt: Date;

    @DeleteDateColumn({
        name: 'delete_at',
    })
    deleteAt: Date;
}