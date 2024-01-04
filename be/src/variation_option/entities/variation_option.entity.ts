import { ProductConfiguration } from "src/product_configuration/entities/product_configuration.entity";
import { Variation } from "src/variation/entities/variation.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VariationOption {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    value: string;

    @ManyToOne(() => Variation, (variation) => variation.options, { nullable: true })
    variation: Variation;

    @OneToMany(() => ProductConfiguration, (configurations) => configurations.variation_option)
    product_configurations: ProductConfiguration[];

    
}
