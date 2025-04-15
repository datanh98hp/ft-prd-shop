import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from '../dto/create-product_category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../entity/product_category.entity';
import { Like, Repository } from 'typeorm';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepo: Repository<ProductCategory>,
  ) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory | HttpException> {
    try {
      const newPrcate = this.productCategoryRepo.create(
        createProductCategoryDto,
      );
      return await this.productCategoryRepo.save(newPrcate);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: PaginateFilter) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    const variation_id = Number(query.variation_id) || null;
    const promotion_category_id = Number(query.promotion_category_id) || null;
    // search

    const keyword = query.keyword || null;

    const [res, total] = await this.productCategoryRepo.findAndCount({
      order: {
        id: sortBy == 'ASC' ? 'ASC' : 'DESC',
      },
      where: {
        category_name: keyword ? Like(`%${keyword}%`) : null,
        variations: {
          id: variation_id,
        },
        promotion_category: {
          id: promotion_category_id,
        },
      },
      cache: true,
      take: items_per_page,
      skip: skip,
      relations: {
        child_categories: true,
        parent_category: true,
        products: true,
        promotion_category: true,
        variations: true,
      },
      select: {
        parent_category: { id: true, category_name: true },
        products: {
          id: true,
          name: true,
          product_images: true,
          description: true,
        },
        promotion_category: { id: true },
        variations: { id: true },
      },
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

  async findOne(id: number): Promise<ProductCategory | null> {
    const item = await this.productCategoryRepo.findOne({
      cache: true,
      where: { id },
      relations: {
        parent_category: true,
        products: true,
        promotion_category: true,
        variations: true,
      },
      select: {
        parent_category: { id: true, category_name: true },
        products: { id: true, name: true },
        promotion_category: { id: true },
        variations: { id: true },
      },
    });
    if (!item) {
      return null;
    }
    return item;
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      const res = await this.productCategoryRepo.update(
        { id },
        updateProductCategoryDto,
      );
      if (res.affected === 0) {
        return new HttpException(
          'Not found item to update',
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException('Update success', HttpStatus.OK);
    } catch (err) {
      return new HttpException(
        'Not found item to update',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async remove(id: number) {
    try {
      const res = await this.productCategoryRepo.delete(id);
      if (res.affected === 0) {
        return new HttpException(
          'Not found item to update',
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException('Delete success', HttpStatus.OK);
    } catch (err) {
      return new HttpException(
        'Not found item to delete',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
