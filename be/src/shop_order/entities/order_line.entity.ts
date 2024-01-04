import { ProductItem } from "src/product_item/entities/product_item.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShopOrder } from "./shop_order.entity";

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qty: number;

    @Column()
    price: number;

    @ManyToOne(() => ProductItem, (prd) => prd.order_lines)
    product_item: ProductItem;

    @ManyToOne(() => ShopOrder, (order) => order.order_lines)
    order: ShopOrder
}