import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/Create-Order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop_order.dto';
import { ShopOrderService } from './shop_order.service';

@Controller('shop-order')
export class ShopOrderController {
  constructor(
    private readonly shopOrderService: ShopOrderService,
    ) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.shopOrderService.createOrder(createOrderDto)
  }
  @Get()
  findAll() {
    return this.shopOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopOrderDto: UpdateShopOrderDto) {
    return this.shopOrderService.update(+id, updateShopOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopOrderService.remove(+id);
  }
}
