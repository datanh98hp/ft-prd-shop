import { ProductCategory } from "src/entity/product_category.entity";
import { ProductItem } from "src/entity/product_item.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ImagesProduct } from "./images_product.entity";
import { Brand } from "./brand.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column({ nullable: true, default: 'slug' })
    slug: string;

    @Column({ nullable: true, default: 0 })
    original_price: number;

    @Column()
    description: string;

    @OneToMany(() => ImagesProduct, (item) => item.product, { nullable: true })
    product_images?: ImagesProduct[]

    @ManyToOne(() => ProductCategory, (cate) => cate.products)
    category: ProductCategory

    @OneToMany(() => ProductItem, (item) => item.product)
    items: ProductItem[]

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}
