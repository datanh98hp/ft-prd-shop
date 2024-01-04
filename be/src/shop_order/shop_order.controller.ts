import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopOrderService } from './shop_order.service';
import { CreateShopOrderDto } from './dto/create-shop_order.dto';
import { UpdateShopOrderDto } from './dto/update-shop_order.dto';

@Controller('shop-order')
export class ShopOrderController {
  constructor(private readonly shopOrderService: ShopOrderService) {}

  @Post()
  create(@Body() createShopOrderDto: CreateShopOrderDto) {
    return this.shopOrderService.create(createShopOrderDto);
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
