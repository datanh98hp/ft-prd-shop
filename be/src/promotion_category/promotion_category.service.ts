import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePromotionCategoryDto } from '../dto/create-promotion_category.dto';
import { UpdatePromotionCategoryDto } from '../dto/update-promotion_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionCategory } from 'src/entity/promotion_category.entity';
import { Repository } from 'typeorm';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

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

  async findAll(query: PaginateFilter) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    const promotionId = Number(query.promotionId) || null;
    const productCateId = Number(query.productCateId) || null;
    // search

    const keyword = query.keyword;

    const [res, total] = await this.promotionCateRepo.findAndCount({
      order: {
        id: sortBy === 'ASC' ? 'ASC' : 'DESC',
      },
      where: [
        {
          promotion: { id: promotionId },
        },
        {
          product_category: { id: productCateId },
        },
 
      ],
      take: items_per_page,
      skip: skip,
      relations: ['promotion', 'product_category'],
    });

    const lastPage = Math.ceil(total / items_per_page);

    const nextPage = page + 1 ? null : page + 1;

    const previousPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      previousPage,
      lastPage,
    };
    
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
