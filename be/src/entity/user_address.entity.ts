import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { User } from 'src/entity/user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  //   @OneToOne(() => User)
  //   @JoinColumn()
  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
  @OneToOne(() => Address)
  @JoinColumn()
  country: Address;

  @Column({ nullable: true, type: 'boolean', default: false })
  isDefault: boolean;
}
