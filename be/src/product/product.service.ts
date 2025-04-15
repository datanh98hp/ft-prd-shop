import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Like, Repository } from 'typeorm';
import { Images } from '../entity/images.entity';
import { CreateImageProductDto } from '../dto/create-Image-product.dto';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Images)
    private readonly productImageRepo: Repository<Images>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newPrd = this.productRepo.create(createProductDto);
    const itemNew = await this.productRepo.save(newPrd);
    if (!itemNew) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
    return itemNew;
  }

  async findAll(query) {
    // console.log(query)
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"
    const product_cate_id = query.product_cate_id || null;

    // search by keyword
    const keyword = query.keyword || null;

    // console.log("Keyword :", keyword)
    // console.log("product_cate_id :", product_cate_id)

    const [res, total] = await this.productRepo.findAndCount({
      order: {
        created_at: sortBy === 'DESC' ? 'DESC' : 'ASC',
      },
      where: {
        name: keyword ? Like(`%${keyword}%`) : null,
        category: { id: product_cate_id },
      },
      cache: true,
      take: items_per_page,
      skip: skip,
      relations: {
        items: true,
        brand: true,
        category: {
          variations: true,
          promotion_category: {
            promotion: true,
          },
        },
        product_images: true,
      },
      select: {
        items: {
          id: true,
          qty_in_stock: true,
        },
        product_images: {
          path: true,
        },
        brand: {
          brand_name: true,
        },
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

  async findOne(id: number): Promise<Product | any> {
    try {
      const item = await this.productRepo.findOne({
        where: { id },
        relations: {
          items: true,
          category: {
            variations: true,
            promotion_category: {
              promotion: true,
            },
          },

          product_images: true,
        },
        select: {
          items: {
            id: true,
            qty_in_stock: true,
          },
        },
      });
      if (!item) {
        return new HttpException('Not found item', HttpStatus.NOT_FOUND);
      }
      return item;
    } catch (error) {
      return new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const item = await this.productRepo.findOneBy({ id });
      if (item) {
        return await this.productRepo.update(id, updateProductDto);
      }
      return {
        message: 'Not found item to update',
      };
    } catch (error) {
      return new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      return await this.productRepo.delete(id);
    } catch (error) {
      return new HttpException(
        'Can not delete this product, that product have items',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //////////////// PRODUCT IMAGE

  async createProductImage(imagesProduct: CreateImageProductDto) {
    try {
      const newPrd = this.productImageRepo.create(imagesProduct);
      const itemNew = await this.productImageRepo.save(newPrd);
      if (itemNew) {
        return itemNew;
      }
      return {};
    } catch (error) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }

  async updateImageProduct(idImg: number, imagesProduct: any) {
    try {
      const item = await this.productImageRepo.findOneBy({ id: idImg });
      if (item) {
        return await this.productImageRepo.update({ id: idImg }, imagesProduct);
      }
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteImageProduct(idImgs: number[]) {
    try {
      for (const id of idImgs) {
        const item = await this.productImageRepo.findOneBy({ id: id });
        if (item) {
          await this.productImageRepo.delete(id);
        }
      }
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async getImageProduct(id: number) {
    return await this.productImageRepo.findOne({
      where: { id },
    });
  }
}
