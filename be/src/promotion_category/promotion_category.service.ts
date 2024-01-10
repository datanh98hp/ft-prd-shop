import { query } from 'express';
import { Injectable } from '@nestjs/common';
import { CreatePromotionCategoryDto } from '../dto/create-promotion_category.dto';
import { UpdatePromotionCategoryDto } from '../dto/update-promotion_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionCategory } from 'src/entity/promotion_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionCategoryService {

  constructor(
    @InjectRepository(PromotionCategory) private readonly promotionCateRepo: Repository<PromotionCategory>
  ) { }


  async create(createPromotionCategoryDto: CreatePromotionCategoryDto) {
    const newCate = await this.promotionCateRepo.create(createPromotionCategoryDto);
    return await this.promotionCateRepo.save(newCate);
  }

  async findAll(query: { sortBy, promotionId, categoriesId }) {

    return await this.promotionCateRepo.find({
      order: {
        id: query.sortBy ? 'DESC' : "ASC"
      },
      relations: ['promotion', 'category']
    });
  }

  async findOne(id: number) {
    return await this.promotionCateRepo.findOneBy({id});
  }

  async update(id: number, updatePromotionCategoryDto: UpdatePromotionCategoryDto) {
    return await this.promotionCateRepo.update(id,updatePromotionCategoryDto) ;
  }

  async remove(id: number) {
    return await this.promotionCateRepo.delete(id);
  }
}
