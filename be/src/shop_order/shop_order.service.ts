import { Injectable } from '@nestjs/common';
import { CreateShopOrderDto } from '../dto/create-shop_order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop_order.dto';

@Injectable()
export class ShopOrderService {
  create(createShopOrderDto: CreateShopOrderDto) {
    return 'This action adds a new shopOrder';
  }

  findAll() {
    return `This action returns all shopOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopOrder`;
  }

  update(id: number, updateShopOrderDto: UpdateShopOrderDto) {
    return `This action updates a #${id} shopOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopOrder`;
  }
}
