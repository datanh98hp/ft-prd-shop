import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from '../entity/promotion.entity';
import { PromotionCategory } from 'src/entity/promotion_category.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([Promotion,PromotionCategory])
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
