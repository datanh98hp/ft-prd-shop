import { ProductCategory } from "src/entity/product_category.entity";
import { VariationOption } from "src/entity/variation_option.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Variation {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    variation_name: string;

    @ManyToOne(() => ProductCategory, (cate) => cate.variations, { nullable: true })
    category: ProductCategory;

    
    @OneToMany(() => VariationOption, (option) => option.variation)
    options: VariationOption[]
}
