import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { ProductItem } from 'src/entity/product_item.entity';
import { ShoppingCart } from 'src/entity/shopping_cart.entity';


export class CreateShoppingCartItemDto {
  @IsNotEmpty()
  cart: ShoppingCart;
  @IsNotEmpty()
  product_item: ProductItem[];
  @IsNotEmpty()
  qty: number;
}
export class UpdateShoppingCartItemDto extends PartialType(
  CreateShoppingCartItemDto,
) {}
