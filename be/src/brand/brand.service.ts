import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateFilter } from 'src/dto/PaginateFilter.dto';
import { CreateBrandDto } from 'src/dto/create-brand.dto';
import { Brand } from 'src/entity/brand.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class BrandService {

    constructor(
        @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,

    ) { }

    async findAll(query: PaginateFilter) {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const sortBy = query.sortBy; //'DESC' || "ASC"

        // search

        const keyword = query.keyword || null;

        const [res, total] = await this.brandRepo.findAndCount({
            order: {
                id: sortBy == "ASC" ? 'ASC' : "DESC"
            },
            where:
            {
                brand_name: keyword ? Like(`%${keyword}%`) : null,
            },
            cache: true,
            take: items_per_page,
            skip: skip,
            relations:
            {
                // products: true
            }
            ,
            select: {

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
    async getBrand(id: number): Promise<Brand> {
        return await this.brandRepo.findOne({
            where: { id },
            relations: ['products'],
            select: ['id', 'brand_name','logo','products']
        });
    }
    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        const newBr = this.brandRepo.create(createBrandDto);
        const itemNew = await this.brandRepo.save(newBr);
        if (!itemNew) {
            throw new HttpException('error', HttpStatus.BAD_REQUEST);
        }
        return itemNew;
    }
    async update(id: number, updateBrandDto: any) {
        try {
            await this.brandRepo.update({ id }, updateBrandDto);
            return new HttpException("Update success", HttpStatus.OK);
        } catch (err) {
            return new HttpException("Not found item to update", HttpStatus.NOT_FOUND);
        }
    }
    async remove(id: number) {
        try {
            await this.brandRepo.delete(id);
            return new HttpException("Delete success", HttpStatus.OK);
        } catch (err) {
            return new HttpException("Not found item to delete", HttpStatus.NOT_FOUND);
        }
    }
}
