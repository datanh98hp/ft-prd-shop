import { ProductItem } from "src/product_item/entities/product_item.entity";
import { VariationOption } from "src/variation_option/entities/variation_option.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductConfiguration {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductItem, (prdItem) => prdItem.product_configurations)
    product_item: VariationOption;

    @ManyToOne(() => VariationOption, (opt) => opt.product_configurations)
    variation_option: VariationOption;

}
