import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { ShopOrder } from "src/entity/shop_order.entity";
import { UserPaymentMethod } from "src/entity/user_payment_method.entity";
import { UserReview } from "src/dto/user_review.entity";
import { UserAddress } from "./user_address.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usermame: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;
    @Column({ nullable: true, default: null })
    refresh_token: string
    @Column({ default: 'normal' })
    role: string;

    @Column({ nullable: true })
    profileImg: string;

    @Column({ type: 'text', nullable: true })
    bio: string
    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @OneToMany(type => ShopOrder, order => order.user)
    orders: ShopOrder[];

    @OneToMany(type => UserPaymentMethod, order => order.user)
    payment_methods: UserPaymentMethod[];


    @OneToMany(type => UserReview, review => review.user)
    reviews: UserReview[];

    @OneToMany(type => UserAddress, addr => addr.user)
    address: UserAddress[]

    
}