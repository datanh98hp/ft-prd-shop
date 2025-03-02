import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { UpdatePromotionDto } from '../dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from '../entity/promotion.entity';
import { Like, Repository } from 'typeorm';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { PromotionCategory } from 'src/entity/promotion_category.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promoteRepo: Repository<Promotion>,
    @InjectRepository(PromotionCategory)
    private readonly cateRepo: Repository<PromotionCategory>,
  ) {}
  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const newPromo = this.promoteRepo.create(createPromotionDto);
    return await this.promoteRepo.save(newPromo);
  }

  async findAll(query: PaginateFilter | any): Promise<any> {
    console.log('promote service query', query);
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      //
      query = {
        page: 1,
        items_per_page: 10,
        keyword: '',
      };
    }

    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    // search

    const keyword = query.keyword;

    const [res, total] = await this.promoteRepo.findAndCount({
      order: {
        created_at: sortBy === 'ASC' ? 'ASC' : 'DESC',
      },
      where: [
        // title: keyword ? Like(`%${keyword}%`) : null,
        // subtitle: keyword ? Like(`%${keyword}%`) : null,
        { name: Like(`%${keyword}%`) },
        { start_date: Like(`%${keyword}%`) },
        { end_date: Like(`%${keyword}%`) },
      ],
      take: items_per_page,
      skip: skip,
      // relations:
      // {
      //   author: true,
      // }
      // ,
      // select: {
      //   author: {
      //     id: true,
      //     email: true,
      //     usermame: true,
      //     profileImg: true,
      //     role: true
      //   }
      // }
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

  async findOne(id: number): Promise<Promotion | any> {
    try {
      const item = await this.promoteRepo.findOneOrFail({
        cache: true,
        where: { id },
        relations: ['promotion_categories'],
      });

      return item;
    } catch (error) {
      return new HttpException('Not found item', HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: number,
    updatePromotionDto: UpdatePromotionDto,
  ): Promise<any> {
    const res = await this.promoteRepo.update({ id }, updatePromotionDto);
    if (res.affected > 0) {
      return new HttpException('Update success', HttpStatus.OK);
    }
    return new HttpException('Update failed', HttpStatus.NOT_MODIFIED);
  }

  async remove(id: number): Promise<any> {
    try {
      const res = await this.promoteRepo.delete(id);
      if (res.affected > 0) {
        return new HttpException('Delete success', HttpStatus.OK);
      }
      return new HttpException('Delete failed', HttpStatus.BAD_REQUEST);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  // promotion_cate

  async list_promotion_cates(id: number): Promise<any> {
    return await this.cateRepo.findOne({
      where: { id },
      relations: ['product_category', 'promotion'],
    });
  }
}
