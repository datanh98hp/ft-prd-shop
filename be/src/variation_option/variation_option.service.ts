import { Injectable } from '@nestjs/common';
import { CreateVariationOptionDto } from '../dto/create-variation_option.dto';
import { UpdateVariationOptionDto } from '../dto/update-variation_option.dto';

@Injectable()
export class VariationOptionService {
  create(createVariationOptionDto: CreateVariationOptionDto) {
    return 'This action adds a new variationOption';
  }

  findAll() {
    return `This action returns all variationOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variationOption`;
  }

  update(id: number, updateVariationOptionDto: UpdateVariationOptionDto) {
    return `This action updates a #${id} variationOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} variationOption`;
  }
}
