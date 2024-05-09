import { ProductCategory } from "src/entity/product_category.entity";
import { ProductItem } from "src/entity/product_item.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ImagesProduct {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        nullable: true
    })
    key?: string;
    @Column()
    path: string;

    @ManyToOne(() => Product, (product) => product.product_images)
    product: Product

}