import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { ShopOrder } from "src/entity/shop_order.entity";
import { UserAddress } from "./user_address.entity";

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

    @ManyToOne(() => Country, (country) => country.address)
    country: Country;

    // @OneToMany(type => UserAddress, usrAddr => usrAddr.)
    // user_address: UserAddress[];

    @OneToMany(type => ShopOrder, order => order.shipping_address)
    orders: ShopOrder[];

}
