import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShoppingCart } from "./shopping_cart.entity";
import { ProductItem } from "./product_item.entity";

@Entity()
export class ShoppingCartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ShoppingCart, (cart) => cart.items)
    cart: ShoppingCart;

    @ManyToOne(() => ProductItem, (product) => product.items)
    product_item: ProductItem;

    @Column({type:'integer'})
    qty: number;
}
