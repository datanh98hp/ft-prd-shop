import { ProductCategory } from "src/product_category/entities/product_category.entity";
import { VariationOption } from "src/variation_option/entities/variation_option.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Variation {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    category_name: string;

    @ManyToOne(() => ProductCategory, (cate) => cate.variations, { nullable: true })
    category: ProductCategory;

    
    @OneToMany(() => VariationOption, (option) => option.variation)
    options: VariationOption[]
}
