import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping_cart.dto';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {}
