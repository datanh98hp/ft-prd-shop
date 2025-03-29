import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ShoppingCartItem } from './shop_cart_item.entity';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => ShoppingCartItem, (item) => item.cart, { nullable: true })
  items: ShoppingCartItem[];

  @CreateDateColumn({ nullable: true })
  created_at: Date;
  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
