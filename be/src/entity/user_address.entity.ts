import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { User } from "src/entity/user.entity";

@Entity()
export class UserAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.address)
    user: User
    
    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @Column()
    isDefault: boolean;
    
}
