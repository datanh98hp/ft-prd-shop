import { Injectable } from '@nestjs/common';
import { CreatePromotionCategoryDto } from '../dto/create-promotion_category.dto';
import { UpdatePromotionCategoryDto } from '../dto/update-promotion_category.dto';

@Injectable()
export class PromotionCategoryService {
  create(createPromotionCategoryDto: CreatePromotionCategoryDto) {
    return 'This action adds a new promotionCategory';
  }

  findAll() {
    return `This action returns all promotionCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionCategory`;
  }

  update(id: number, updatePromotionCategoryDto: UpdatePromotionCategoryDto) {
    return `This action updates a #${id} promotionCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionCategory`;
  }
}
