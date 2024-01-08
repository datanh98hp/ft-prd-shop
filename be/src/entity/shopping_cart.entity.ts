import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ShoppingCartItem } from "./shop_cart_item.entity";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => ShoppingCartItem, (item) => item.cart)
    items: ShoppingCartItem[]

    

}
