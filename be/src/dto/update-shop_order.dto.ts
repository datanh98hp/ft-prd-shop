import { PartialType } from '@nestjs/mapped-types';
import { CreateShopOrderDto } from './create-shop_order.dto';

export class UpdateShopOrderDto extends PartialType(CreateShopOrderDto) {}
