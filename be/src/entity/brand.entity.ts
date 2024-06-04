import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    brand_name: string;
    @Column({ nullable: true })
    logo: string;

    @OneToMany(() => Product, (prd) => prd.brand, { nullable: true })
    products: Product[]

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
    ///

}
