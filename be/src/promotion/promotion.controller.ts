import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { UpdatePromotionDto } from '../dto/update-promotion.dto';
import { query } from 'express';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Controller('promotion')
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionService
    ) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Get()
  findAll(@Query() query:PaginateFilter) {
    return this.promotionService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionService.update(+id, updatePromotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionService.remove(+id);
  }
  // promotion_category

  @Get('promotion-category')
  async listCate(@Query() query: { id, promotion_id,sortBy} ):Promise<any>{
    return await this.listCate(query);
  }

}
