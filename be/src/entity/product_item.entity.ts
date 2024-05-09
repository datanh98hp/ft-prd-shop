import { Product } from "src/entity/product.entity";
import { ProductConfiguration } from "src/entity/product_configuration.entity";
import { OrderLine } from "src/entity/order_line.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ShoppingCartItem } from "./shop_cart_item.entity";

@Entity()
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    sku: string;
    @Column({default:0})
    qty_in_stock: number;
    @Column({nullable:true})
    product_images?: string;
    @Column({default:0})
    price: number;
    @ManyToOne(() => Product, (prd) => prd.items)
    product: Product;
    
    @OneToMany(() => ProductConfiguration, (config) => config.product_item)
    product_configurations: ProductConfiguration[];

    @OneToMany(() => OrderLine, (lines) => lines.product_item)
    order_lines: OrderLine[];

    @OneToMany(() => ShoppingCartItem, (item) => item.cart)
    cart_items: ShoppingCartItem[];

    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
    
}
