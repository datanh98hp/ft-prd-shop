import { ProductCategory } from "src/entity/product_category.entity";
import { ProductItem } from "src/entity/product_item.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ImagesProduct } from "./images_product.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;

    @OneToMany(() => ImagesProduct, (item) => item.product, { nullable: true })
    product_images?: ImagesProduct[]

    @ManyToOne(() => ProductCategory, (cate) => cate.prducts)
    category: ProductCategory


    @OneToMany(() => ProductItem, (item) => item.product)
    items: ProductItem[]

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}
