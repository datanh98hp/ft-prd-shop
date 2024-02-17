import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const newPrd = this.productRepo.create(createProductDto);
    const itemNew = await this.productRepo.save(newPrd);
    if (!itemNew) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('success', HttpStatus.CREATED);
  }

  async findAll(query) {
    // console.log(query)
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"
    const product_cate_id = query.product_cate_id || null;
    // search

    const keyword = query.keyword;

    console.log(keyword)
    console.log(product_cate_id)
    switch (product_cate_id) {
      case null:
        const [res, total] = await this.productRepo.findAndCount({
          order: {
            created_at: sortBy ? 'ASC' : "DESC"
          },
          where:
            // [
            // title: keyword ? Like(`%${keyword}%`) : null,
            // subtitle: keyword ? Like(`%${keyword}%`) : null,
            { name: Like(`%${keyword}%`) },
          // {
          //   category: { id: product_cate_id }
          // }
          // ],

          cache: true,
          take: items_per_page,
          skip: skip,
          relations:
          {
            items: true,
            category: true
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
      default:
        const [res2, total2] = await this.productRepo.findAndCount({
          order: {
            created_at: sortBy ? 'ASC' : "DESC"
          },
          where:
            [
              // title: keyword ? Like(`%${keyword}%`) : null,
              // subtitle: keyword ? Like(`%${keyword}%`) : null,
              {
                name: Like(`%${keyword}%`),
              },
              {
                category: { id: product_cate_id }
              }

            ],

          cache: true,
          take: items_per_page,
          skip: skip,
          relations:
          {
            items: true,
            category: true
          }

        });

        const lastPage2 = Math.ceil(total2 / items_per_page);

        const nextPage2 = page + 1 ? null : page + 1;

        const previousPage2 = page - 1 < 1 ? null : page - 1;
        return {
          data: res2,
          total: total2,
          currentPage: page,
          nextPage: nextPage2,
          previousPage: previousPage2,
          lastPage: lastPage2,
        };
    }

  }

  async findOne(id: number) {
    try {
      return await this.productRepo.findOne({
        where: { id },
        relations:
        {
          items: true,
          category: true
        }
      });
    } catch (error) {
      throw new HttpException('Not found item', HttpStatus.NOT_FOUND);
    }

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.productRepo.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException('Not found item to update', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    try {
      return await this.productRepo.delete(id);
    } catch (error) {
      throw new HttpException('Can not delete this product, that product have items', HttpStatus.NOT_FOUND);
    }

  }
}
