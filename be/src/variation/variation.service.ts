import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVariationDto } from '../dto/create-variation.dto';
import { UpdateVariationDto } from '../dto/update-variation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variation } from 'src/entity/variation.entity';
import { Repository } from 'typeorm';
import { VariationOption } from 'src/entity/variation_option.entity';
import { CreateVariationOptionDto } from 'src/dto/create-variation_option.dto';
import { UpdateVariationOptionDto } from 'src/dto/update-variation_option.dto';

@Injectable()
export class VariationService {

  constructor(
    @InjectRepository(Variation) readonly variationRepo: Repository<Variation>,
    @InjectRepository(VariationOption) readonly variationOptRepo: Repository<VariationOption>,
  ) {
  }

  async create(createVariationDto: CreateVariationDto) {
    const newVari = this.variationRepo.create(createVariationDto)
    return await this.variationRepo.save(newVari);
  }

  async findAll(query: { sortBy, categoryId }) {

    const sortBy = query.sortBy;
    const categoryId = query.categoryId;


    console.log(categoryId)
    switch (categoryId) {
      case undefined:
        return await this.variationRepo.find({
          order: {
            id: sortBy ? 'DESC' : 'ASC'
          },
          relations: {
            options: true,
            category: true
          }
        });
      default:
        return await this.variationRepo.find({
          order: {
            id: sortBy ? 'DESC' : 'ASC'
          },
          where: [
            { category: { id: categoryId } }
          ],
          relations: {
            options: true,
            category: true
          }
        });
    }
  }

  async findOne(id: number) {
    try {
      return await this.variationRepo.findOneBy({ id });
    } catch (error) {
      return await new HttpException('Not found item.', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateVariationDto: UpdateVariationDto) {
    try {
      return await this.variationRepo.update(id, updateVariationDto);
    } catch (error) {
      return await new HttpException('Not found item to update.', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    return await this.variationRepo.delete(id);
  }
  // option_variation

  async getOptions(query: { sortBy, variation_id }) {
    const sortBy = query.sortBy;
    const variation_id = query.variation_id;


    //console.log(variation_id)
    switch (variation_id) {
      case undefined:
        return await this.variationOptRepo.find({
          order: {
            id: sortBy ? 'DESC' : 'ASC'
          },
          relations: {
            variation: true,
            product_configurations: true
          }
        });
      default:
        return await this.variationOptRepo.find({
          order: {
            id: sortBy ? 'DESC' : 'ASC'
          },
          where: [
            { variation: { id: variation_id } }
          ],
          relations: {
            product_configurations: true,
            variation: true
          }
        });
    }
  }

  async createVariationOpt(varianOptDto: CreateVariationOptionDto) {
    const newOpt = this.variationOptRepo.create(varianOptDto);
    return await this.variationOptRepo.save(newOpt);
  }
  async getVariationOpt(id: number) {

    try {
      return await this.variationOptRepo.findOne({ 
        where:{id},
        relations: ['variation','product_configurations']});
    } catch (error) {
      return await new HttpException('Not found item.', HttpStatus.NOT_FOUND);
    }
  }

  async updateVariationOpt(id: number, variationOptDto: UpdateVariationOptionDto) {
    return await this.variationOptRepo.update(id, variationOptDto);
  }

  async deleteVariationOpt(id: number) {
    return await this.variationOptRepo.delete(id);
  }

}
