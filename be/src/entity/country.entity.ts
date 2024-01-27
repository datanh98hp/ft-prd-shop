import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    code: string;
    @Column()
    country_name: string;

    @OneToMany(() => Address, (addrs) => addrs.country)
    address: Address[]
}
