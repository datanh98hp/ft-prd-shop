import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './Create-Order.dto';

export class UpdateShopOrderDto extends PartialType(CreateOrderDto) {

}
