import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShopOrder } from "./shop_order.entity";

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => ShopOrder, (order) => order.order_status)
    orders: ShopOrder[]
}