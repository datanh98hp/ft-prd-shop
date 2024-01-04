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
    @InjectRepository(ProductCategory) private readonly productCategoryRepo: Repository<ProductCategory>
  ) { }

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const newPrcate = this.productCategoryRepo.create(createProductCategoryDto)
    return await this.productCategoryRepo.save(newPrcate);
  }

  async findAll(query: PaginateFilter) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    // search

    const keyword = query.keyword;

    const [res, total] = await this.productCategoryRepo.findAndCount({
      order: {
        id: sortBy ? 'ASC' : "DESC"
      },
      where: [
        // title: keyword ? Like(`%${keyword}%`) : null,
        // subtitle: keyword ? Like(`%${keyword}%`) : null,
        { category_name: Like(`%${keyword}%`) }
      ],
      take: items_per_page,
      skip: skip,
      relations:
      {
        parent_category: true,
      }
      ,
      select: {
        parent_category: {}
      }
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
    const item = await this.productCategoryRepo.findOne(
      {
        cache: true,
        where: { id },
        relations: ['parent_category'],
        select: {
          parent_category: {}
        }
      }
    );
    if (!item) {
      return new HttpException("Not found item", HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      return await this.productCategoryRepo.update({ id }, updateProductCategoryDto);
    } catch (err) {
      return new HttpException("Not found item to update", HttpStatus.NOT_FOUND);
    }
  }
  async remove(id: number) {
    try {
      return await this.productCategoryRepo.delete(id);
    } catch (err) {
      return new HttpException("Not found item to delete", HttpStatus.NOT_FOUND);
    }
  }
}
