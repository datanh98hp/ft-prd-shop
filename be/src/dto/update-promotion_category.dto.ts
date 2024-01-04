import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionCategoryDto } from './create-promotion_category.dto';

export class UpdatePromotionCategoryDto extends PartialType(CreatePromotionCategoryDto) {}
