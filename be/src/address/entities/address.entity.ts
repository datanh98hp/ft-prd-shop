import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { ShopOrder } from "src/shop_order/entities/shop_order.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable:true})
    unit_number: string;
    @Column({ nullable: true })
    stress_number: string;
    @Column({ nullable: true })
    address_line_1: string;
    @Column({ nullable: true })
    address_line_2: string;
    @Column({ nullable: true })
    city: string;
    @Column({ nullable: true })
    postal_code: string;

    @OneToOne(() => Country)
    @JoinColumn()
    country: Country;


    @OneToMany(type => ShopOrder, order => order.shipping_address)
    payment_methods: ShopOrder[];
}
