import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        nullable: true
    })
    key?: string;
    @Column()
    path: string;

    @ManyToOne(() => Product, (product) => product.product_images)
    product: Product

}