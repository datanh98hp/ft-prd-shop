import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateProductConfigurationDto } from '../dto/create-product_configuration.dto';
import { UpdateProductConfigurationDto } from '../dto/update-product_configuration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductConfiguration } from 'src/entity/product_configuration.entity';
import { Like, Repository } from 'typeorm';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Injectable()
export class ProductConfigurationService {
  constructor(
    @InjectRepository(ProductConfiguration)
    private readonly productConfigRepo: Repository<ProductConfiguration>,
  ) {}
  async create(createProductConfigurationDto: CreateProductConfigurationDto) {
    return await this.productConfigRepo.save(createProductConfigurationDto);
  }

  async findAll(query: PaginateFilter) {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy: string = query.sortBy; //'DESC' || "ASC"

    const sku = query.sku || null;

    const product_id = Number(query.product_id) || null;
    const variation_option = Number(query.variation_option) || null;

    const [res, total] = await this.productConfigRepo.findAndCount({
      order: {
        id: sortBy == 'ASC' ? 'ASC' : 'DESC',
      },
      transaction: true,
      where: {
        product_item: {
          id: product_id,
          sku: sku ? Like(`%${sku}%`) : null,
        },
        variation_option: {
          id: variation_option,
        },
      },
      cache: true,
      take: items_per_page,
      skip: skip,
      relations: ['product_item', 'variation_option'],
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

  async findOne(id: number): Promise<ProductConfiguration | HttpException> {
    try {
      return await this.productConfigRepo.findOne({
        where: { id },
        relations: ['product_item', 'variation_option'],
      });
    } catch (error) {
      return new HttpException('Not found', 404);
    }
  }

  async update(
    id: number,
    updateProductConfigurationDto: UpdateProductConfigurationDto,
  ) {
    try {
      const res = await this.productConfigRepo.update(
        { id },
        updateProductConfigurationDto,
      );

      if (res.affected === 0) {
        return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.productConfigRepo.delete(id);

      if (res.affected === 0) {
        return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      return new HttpException('Deleted', HttpStatus.OK);
    } catch (error) {
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
