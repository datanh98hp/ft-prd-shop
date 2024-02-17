import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    code: string;
    @Column()
    country_name: string;
    
    @ManyToOne(() => Address, (addr) => addr.country)
    address: Address
}
