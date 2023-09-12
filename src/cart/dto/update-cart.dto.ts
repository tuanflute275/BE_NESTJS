import { Expose } from 'class-transformer';

export class UpdateCartDto {
    @Expose()
    userId: number;

    @Expose()
    prodId: number;

    @Expose()
    quantity: number;
}
