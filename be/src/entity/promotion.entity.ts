import { PromotionCategory } from "src/entity/promotion_category.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Promotion {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    discount_rate: number;
    @Column()
    start_date: string;
    @Column()
    end_date: string;
    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    @OneToMany(() => PromotionCategory, (prmCate) => prmCate.promotion)
    promotions: PromotionCategory[]
}
