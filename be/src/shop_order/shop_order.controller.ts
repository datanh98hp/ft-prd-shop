import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/Create-Order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop_order.dto';
import { ShopOrderService } from './shop_order.service';
import { query } from 'express';
import { OrderQueryFilterPaginate } from 'src/dto/OrderQueryFilterPaginate.dto';

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
  findAll(@Query() query: OrderQueryFilterPaginate) {
    return this.shopOrderService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopOrderService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShopOrderDto: UpdateShopOrderDto) {
    return await this.shopOrderService.update(+id, updateShopOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopOrderService.remove(+id);
  }
}
