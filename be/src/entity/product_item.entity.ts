import { Product } from "src/entity/product.entity";
import { ProductConfiguration } from "src/entity/product_configuration.entity";
import { OrderLine } from "src/entity/order_line.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShoppingCartItem } from "./shop_cart_item.entity";

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

    @OneToMany(() => ShoppingCartItem, (item) => item.cart)
    items: ShoppingCartItem[]

    
}
