import { Module } from '@nestjs/common';
import { PromotionCategoryService } from './promotion_category.service';
import { PromotionCategoryController } from './promotion_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionCategory } from '../entity/promotion_category.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([PromotionCategory])
  ],
  controllers: [PromotionCategoryController],
  providers: [PromotionCategoryService],
})
export class PromotionCategoryModule {}
