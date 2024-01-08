import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from '../dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from '../dto/update-shopping_cart.dto';

@Injectable()
export class ShoppingCartService {
  create(createShoppingCartDto: CreateShoppingCartDto) {
    return 'This action adds a new shoppingCart';
  }

  findAll() {
    return `This action returns all shoppingCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
