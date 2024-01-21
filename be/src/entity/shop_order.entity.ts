import { User } from "src/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPaymentMethod } from "./user_payment_method.entity";
import { Address } from "src/entity/address.entity";
import { ShippingMethod } from "./shipping_method.entity";
import { OrderLine } from "./order_line.entity";
import { UserReview } from "src/dto/user_review.entity";
import { OrderStatus } from "./order_status.entity";

@Entity()
export class ShopOrder {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    //@Column({default:Date.now().toString()})
    @CreateDateColumn({ nullable: true })
    order_date: Date;

    @ManyToOne(() => UserPaymentMethod, (method) => method.payment_methods)
    payment_method: UserPaymentMethod;

    @ManyToOne(() => Address, (address) => address.orders)
    shipping_address: Address;

    @ManyToOne(() => ShippingMethod, (method) => method.shop_orders)
    shippingMethod: ShippingMethod;

    @OneToMany(() => OrderLine, (lines) => lines.order)
    order_lines: OrderLine[];

    @OneToMany(() => UserReview, (review) => review.revirew_order,{nullable:true})
    review: UserReview[];

    @Column({default:0})
    order_total: number;

    @ManyToOne(() => OrderStatus, (stt) => stt.orders)
    order_status: OrderStatus;

}
