import { UpdateProductConfigurationDto } from './../dto/update-product_configuration.dto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductConfigurationDto } from 'src/dto/create-product_configuration.dto';
import { ProductConfiguration } from 'src/entity/product_configuration.entity';
import { ProductItem } from 'src/entity/product_item.entity';
import { Like, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateProductItemDto } from '../dto/create-product_item.dto';
import { UpdateProductItemDto } from '../dto/update-product_item.dto';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItem) private readonly productItemRepo: Repository<ProductItem>,
    @InjectRepository(ProductConfiguration) private readonly productConfigRepo: Repository<ProductConfiguration>,
  ) { }

  async create(createProductItemDto: CreateProductItemDto) {
    const newItmPrd = this.productItemRepo.create(createProductItemDto);
    const itemNew = await this.productItemRepo.save(newItmPrd);
    if (!itemNew) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('success', HttpStatus.CREATED);
  }

  async findAll(query: PaginateFilter) {

    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy: string = query.sortBy; //'DESC' || "ASC"

    const sku = query.sku || null;
    /// filter by
    //const qty_in_stock = Number(query.qty_in_stock) || 0;
    // const startPrice = Number(query.startPrice) || 0;
    // const endPrice = Number(query.endPrice) || 0;
    const product_id = Number(query.product_id) || null;
    // search

    const keyword = query.keyword || null;

    const [res, total] = await this.productItemRepo.findAndCount({
      order: {
        id: sortBy == "ASC" ? "ASC" : "DESC",
      },
      transaction: true,
      where:
      {
        sku: sku ? Like(`%${sku}%`) : null,
        product: {
          id: product_id,
          name: keyword ? Like(`%${keyword}%`) : null,
        }
      },
      cache: true,
      take: items_per_page,
      skip: skip,
      select: {
        id: true,
        qty_in_stock: true,
        product_images: true,
        price: true,
        product: {
          id: true,
          name: true,
          description: true,
          product_images: true,
          category: {
            promotion_category: {
              product_category: true
            },
          },

        },
        sku: true,
        product_configurations: {
          variation_option: {
            variation: {
              options: true,
              
            },
            value: true
          },
        
        }
      },
      relations:
      {
        // cart_items: true,
        product: {
          category: {
            promotion_category: {
              promotion: true
            },
            variations: true,
          },
        },
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
  // async filter(query: ProductItemFilterPaginateDto) {
  //   console.log(query);
  //   const items_per_page = Number(query.items_per_page) || 10;
  //   const page = Number(query.page) || 1;

  //   const skip = (page - 1) * items_per_page;

  //   const sortBy = query.sortBy; //'DESC' || "ASC"

  //   const sku = query.sku;
  //   /// filter by
  //   const qty_in_stock = Number(query.qty_in_stock) || 0;
  //   const startPrice = Number(query.startPrice) || 0;
  //   const endPrice = Number(query.endPrice) || 0;
  //   const product_id = Number(query.product_id) || null;
  //   // search

  //   const keyword = query.keyword;

  //   const [res, total] = await this.productItemRepo.findAndCount({
  //     order: {
  //       // created_at: sortBy ? 'ASC' : "DESC",
  //       price: sortBy ? 'ASC' : "DESC",
  //     },
  //     transaction: true,
  //     where: {
  //       product: { id: product_id },
  //       price: MoreThanOrEqual(startPrice),
  //     },
  //     cache: true,
  //     take: items_per_page,
  //     skip: skip,
  //     relations:
  //     {
  //       cart_items: true,
  //       product: true,
  //       product_configurations: true
  //     }

  //   });
  //   const lastPage = Math.ceil(total / items_per_page);

  //   const nextPage = page + 1 ? null : page + 1;

  //   const previousPage = page - 1 < 1 ? null : page - 1;
  //   return {
  //     data: res,
  //     total,
  //     currentPage: page,
  //     nextPage,
  //     previousPage,
  //     lastPage,
  //   };
  // }
  async findOne(id: number) {
    try {
      return await this.productItemRepo.findOneOrFail({
        where: { id },
        cache: true,
        relations:
        {
          // cart_items: true,
          // order_lines: true,
          product_configurations: {
            variation_option: {
              variation: {
                options: true,
              },
            }
          }
        }
      });
    } catch (error) {
      throw new HttpException('Not found item', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateProductItemDto: UpdateProductItemDto) {
    try {
      const res = await this.productItemRepo.update({ id }, updateProductItemDto);
      if(res.affected<=0){
        return new HttpException('Update failed', HttpStatus.NOT_MODIFIED);
      }
      return new HttpException('Update success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException('Not found item to update', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.productItemRepo.delete(id);
      if (res.affected === 0) {
        return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      return new HttpException("Delete success",HttpStatus.OK);
    } catch (error) {
      throw new HttpException('Can not delete this product, that product have items', HttpStatus.NOT_FOUND);
    }
  }

  //add product_item image
  async addImageProductItem(id: number, image: string) {
    try {
      
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }


  // product_configuration
  async listVariationOptions() {
    return await this.productConfigRepo.find({
      relations: {
        product_item: true,
        variation_option: true
      }
    });
  }
  async createVariationOption(createProductOpt: CreateProductConfigurationDto) {
    console.log(createProductOpt)
    const newOpt = this.productConfigRepo.create(createProductOpt);
    return await this.productConfigRepo.save(newOpt);
  }

  async updateVariationOption(id: number, updateProductOpt: UpdateProductConfigurationDto) {
    return await this.productConfigRepo.update(id, updateProductOpt);
  }

  async deleteVariationOption(id: number) {
    return await this.productConfigRepo.delete(id);
  }

}
