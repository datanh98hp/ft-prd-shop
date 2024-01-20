import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../entity/address.entity";
import { User } from "src/entity/user.entity";

@Entity()
export class UserAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User
    @OneToOne(() => Address)
    @JoinColumn()
    country: Address

    @Column()
    isDefault: string;
}
