import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShopOrder } from "./shop_order.entity";

@Entity()
export class ShippingMethod {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    price: string;

    @OneToMany(() => ShopOrder, order => order.payment_method)
    shop_orders : ShopOrder[];
}