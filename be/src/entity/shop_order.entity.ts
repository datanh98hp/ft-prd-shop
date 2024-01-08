import { User } from "src/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPaymentMethod } from "./user_payment_method.entity";
import { Address } from "src/address/entities/address.entity";
import { ShippingMethod } from "./shipping_method.entity";
import { OrderLine } from "./order_line.entity";
import { UserReview } from "src/address/entities/user_review.entity";

@Entity()
export class ShopOrder {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column({type:'time without time zone'})
    order_date: Date;

    @ManyToOne(() => UserPaymentMethod, (method) => method.payment_methods)
    payment_method: UserPaymentMethod;

    @ManyToOne(() => Address, (address) => address.payment_methods)
    shipping_address: Address;

    @ManyToOne(() => ShippingMethod, (method) => method.shop_orders)
    shippingMethod: ShippingMethod;

    @OneToMany(() => OrderLine, (lines) => lines.order)
    order_lines: OrderLine[];


    @OneToMany(() => UserReview, (review) => review.revirew_order,{nullable:true})
    review: UserReview[];

    @Column()
    order_total: number;

    @Column()
    order_status: number;

}
