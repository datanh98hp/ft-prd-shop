import { User } from "src/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PaymentType } from "./payment_type.entity";
import { ShopOrder } from "./shop_order.entity";

@Entity()
export class UserPaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    // name: string;
    // @Column()
    price: string;

    @ManyToOne(() => User, (user) => user.payment_methods)
    user: User;

    @ManyToOne(() => PaymentType, (type) => type.user_payment_methods)
    payment_type: PaymentType;

    @Column()
    provider: string;

    @Column()
    account_number: string;
    @Column()
    expiry_date:string;
    @Column({type:'boolean'})
    is_default: boolean;

    @OneToMany(type => ShopOrder, order => order.payment_method)
    payment_methods: ShopOrder[];
}