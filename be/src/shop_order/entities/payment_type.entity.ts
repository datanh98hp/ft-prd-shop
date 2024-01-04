import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPaymentMethod } from "./user_payment_method.entity";

@Entity()
export class PaymentType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;

    @OneToMany(type => UserPaymentMethod, order => order.user)
    user_payment_methods: UserPaymentMethod[];

    
}