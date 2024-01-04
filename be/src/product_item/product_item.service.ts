import { Injectable } from '@nestjs/common';
import { CreateProductItemDto } from './dto/create-product_item.dto';
import { UpdateProductItemDto } from './dto/update-product_item.dto';

@Injectable()
export class ProductItemService {
  create(createProductItemDto: CreateProductItemDto) {
    return 'This action adds a new productItem';
  }

  findAll() {
    return `This action returns all productItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productItem`;
  }

  update(id: number, updateProductItemDto: UpdateProductItemDto) {
    return `This action updates a #${id} productItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productItem`;
  }
}
