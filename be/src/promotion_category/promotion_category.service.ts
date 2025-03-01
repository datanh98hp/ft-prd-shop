import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePromotionCategoryDto } from '../dto/create-promotion_category.dto';
import { UpdatePromotionCategoryDto } from '../dto/update-promotion_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionCategory } from 'src/entity/promotion_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionCategoryService {
  constructor(
    @InjectRepository(PromotionCategory)
    private readonly promotionCateRepo: Repository<PromotionCategory>,
  ) {}

  async create(createPromotionCategoryDto: CreatePromotionCategoryDto) {
    try {
      const newCate = await this.promotionCateRepo.create(
        createPromotionCategoryDto,
      );
      return await this.promotionCateRepo.save(newCate);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: { sortBy; promotionId; categoriesId }) {
    return await this.promotionCateRepo.find({
      order: {
        id: query.sortBy ? 'DESC' : 'ASC',
      },
      relations: ['promotion', 'product_category'],
    });
  }

  async findOne(id: number) {
    try {
      return await this.promotionCateRepo.findOneByOrFail({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: number,
    updatePromotionCategoryDto: UpdatePromotionCategoryDto,
  ) {
    const res = await this.promotionCateRepo.update(
      id,
      updatePromotionCategoryDto,
    );

    if (res.affected === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async remove(id: number) {
    const res = await this.promotionCateRepo.delete(id);
    if (res.affected === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}
