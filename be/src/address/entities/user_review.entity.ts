import { User } from "src/entity/user.entity";
import { ShopOrder } from "src/shop_order/entities/shop_order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rate_vaue: number;

    @Column()
    comment: number;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => ShopOrder, (order) => order.review)
    revirew_order: ShopOrder;

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

}