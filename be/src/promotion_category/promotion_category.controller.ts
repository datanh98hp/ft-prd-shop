import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePromotionCategoryDto } from '../dto/create-promotion_category.dto';
import { UpdatePromotionCategoryDto } from '../dto/update-promotion_category.dto';
import { PromotionCategoryService } from './promotion_category.service';

@Controller('promotion-category')
export class PromotionCategoryController {
  constructor(private readonly promotionCategoryService: PromotionCategoryService) {}

  @Post()
  create(@Body() createPromotionCategoryDto: CreatePromotionCategoryDto) {
    return this.promotionCategoryService.create(createPromotionCategoryDto);
  }

  @Get()
  async findAll(@Query() query: { sortBy, promotionId, categoriesId }) {
    return this.promotionCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionCategoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePromotionCategoryDto: UpdatePromotionCategoryDto) {
    return this.promotionCategoryService.update(+id, updatePromotionCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionCategoryService.remove(+id);
  }
}
