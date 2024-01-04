import { ProductCategory } from "src/product_category/entities/product_category.entity";
import { ProductItem } from "src/product_item/entities/product_item.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    product_images: string;

    @ManyToOne(() => ProductCategory, (cate) => cate.prducts)
    category: ProductCategory


    @OneToMany(() => ProductItem, (item) => item.product)
    items: ProductItem[]

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}
