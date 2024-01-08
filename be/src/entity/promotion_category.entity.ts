import { ProductCategory } from "src/entity/product_category.entity";
import { Promotion } from "src/entity/promotion.entity";
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
