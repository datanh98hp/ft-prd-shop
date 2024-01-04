import { Product } from "src/product/entities/product.entity";
import { ProductConfiguration } from "src/product_configuration/entities/product_configuration.entity";
import { OrderLine } from "src/shop_order/entities/order_line.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    sku: string;
    @Column()
    qty_in_stock: string;
    @Column()
    product_images: string;
    @Column()
    price: string;
    @ManyToOne(() => Product, (prd) => prd.items)
    product: Product;

    @OneToMany(() => ProductConfiguration, (config) => config.product_item)
    product_configurations: ProductConfiguration[];

    @OneToMany(() => OrderLine, (lines) => lines.product_item)
    order_lines: OrderLine[];

    
}
