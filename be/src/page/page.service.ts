import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ProductCategory } from 'src/entity/product_category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Product } from 'src/entity/product.entity';
import { Promotion } from 'src/entity/promotion.entity';
import { Brand } from 'src/entity/brand.entity';

@Injectable()
export class PageService {

  constructor(
    @InjectRepository(ProductCategory) private readonly categoryRepository: Repository<ProductCategory>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Promotion) private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
  ) { }
  async homePageData() {
    //get 5 category having a best number of products
    const categories = await this.categoryRepository.find({
      take: 5,
      cache: true,
      where: { parent_category: null },
      relations: {
        products: { items: true }, promotion_category: { promotion: true },
      },
      order: {
        created_at: 'DESC',
        products: { items: { qty_in_stock: 'DESC' } },
        promotion_category: { promotion: { id: 'DESC' } },
      },
      select: {
        id: true,
        category_name: true,
        category_img: true,
        parent_category: {
          id: true
        },
        promotion_category: {
          id: true,
          promotion: { id: true }
        },
        created_at: true
      }
    });
    //get 5 products having the newest products
    const latestProducts = await this.productRepository.find({
      take: 6,
      cache: true,
      order: {
        id: 'DESC',
        created_at: 'DESC',
      },
    });
    const topProducts = await this.productRepository.find({
      take: 6,
      cache: true,
      relations: {
        items: true
      },
      order: {
        items: {
          qty_in_stock: 'DESC'
        }
      },
    });

    const listHotDealProducts = await this.promotionRepository.find({
      take: 4,
      cache: true,
      relations: {
        promotion_categories: { promotion: true, product_category: { products: true } }
      },
      order: {
        id: 'DESC',
        promotion_categories: {
          product_category: { products: { id: 'ASC' } }
        }
      },
      select: {
        id: true,
        name: true,
        discount_rate: true,
        description: true,
        start_date: true,
        end_date: true,
        promotion_categories: {
          product_category: {
            products: true
          }
        }
      }
    });

    const listBrands = await this.brandRepository.find({
      take: 5,
      cache: true,
      relations: {
        products: { items: true }
      },
      order: {
        id: 'DESC',
        products: { items: { qty_in_stock: 'DESC' } }
      },
      select: {
        id: true,
        brand_name: true,
        logo: true,
        products: { id: true, name: true, original_price: true }
      }
    })

    return {
      categories,
      latestProducts,
      topProducts,
      dealing_products: listHotDealProducts,
      listBrands
    };
  }

  findAll() {
    return `This action returns all page`;
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
