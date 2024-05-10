import { Product } from "src/entity/product.entity";
import { PromotionCategory } from "src/entity/promotion_category.entity";
import { Variation } from "src/entity/variation.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    category_name: string;

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    @OneToMany(() => ProductCategory, (cate) => cate.parent_category,{nullable:true})
    parent_categories: ProductCategory[]
    
    @ManyToOne(() => ProductCategory, (cate) => cate.parent_categories, { nullable: true })
    parent_category: ProductCategory;
    /////////////////////
    @ManyToOne(() => PromotionCategory, (prCate) => prCate.promotion)
    promotions: PromotionCategory[]

    @OneToMany(() => Product, (prod) => prod.category, { nullable: true })
    prducts: Product[]

    @OneToMany(() => Variation, (variation) => variation.category, { nullable: true })
    variations: Variation[]

}
