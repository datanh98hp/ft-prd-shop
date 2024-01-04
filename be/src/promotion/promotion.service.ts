import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Like, Repository } from 'typeorm';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion) private readonly promoteRepo: Repository<Promotion>
  ) { }
  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const newPromo = this.promoteRepo.create(createPromotionDto);
    return await this.promoteRepo.save(newPromo);
  }

  async findAll(query: PaginateFilter): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    // search

    const keyword = query.keyword;

    const [res, total] = await this.promoteRepo.findAndCount({
      order: {
        created_at: sortBy ? 'ASC' : "DESC"
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
    const item = await this.promoteRepo.findOne(
      {
        cache: true,
        where: { id },
        relations: ['author'],
        // select: {
        //   author: {
        //     id: true,
        //     email: true,
        //     usermame: true,
        //     profileImg: true,
        //     role: true
        //   }
        // }
      }
    );
    if (!item) {
      return new HttpException('Not found item', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto): Promise<any> {
    return await this.promoteRepo.update({ id }, updatePromotionDto);
  }

  async remove(id: number): Promise<any> {
    return await this.promoteRepo.delete(id);
  }
}
