import { Product } from "src/entity/product.entity";
import { PromotionCategory } from "src/entity/promotion_category.entity";
import { Variation } from "src/entity/variation.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Index(["id", "parent_category", "promotion_category"], { unique: true })
@Unique(["parent_category", "promotion_category"])
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    category_name: string;

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
    ///
    @OneToMany(() => ProductCategory, (cate) => cate.parent_category, { nullable: true })
    child_categories: ProductCategory[]
    @ManyToOne(() => ProductCategory, (cate) => cate.child_categories, { nullable: true })
    parent_category: ProductCategory;
    /////////////////////
    @ManyToOne(() => PromotionCategory, (it) => it.product_category)
    promotion_category: PromotionCategory

    @OneToMany(() => Product, (prod) => prod.category, { nullable: true })
    products: Product[]

    @OneToMany(() => Variation, (variation) => variation.category, { nullable: true })
    variations: Variation[]

}
