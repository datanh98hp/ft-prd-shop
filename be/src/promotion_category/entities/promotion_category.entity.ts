import { ProductCategory } from "src/product_category/entities/product_category.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PromotionCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductCategory, (it) => it.parent_category)
    categories: number;
    
    @ManyToOne(() => Promotion, (user) => user.promotions)
    promotion: number;
}
