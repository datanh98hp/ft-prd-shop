import { ProductCategory } from 'src/entity/product_category.entity';
import { Promotion } from 'src/entity/promotion.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PromotionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => ProductCategory, (it) => it.promotion_category)
  product_category: ProductCategory[];

  @ManyToOne(() => Promotion, (pr) => pr.promotion_categories)
  promotion: Promotion;
}
