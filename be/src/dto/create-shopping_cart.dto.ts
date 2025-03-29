import { IsNotEmpty } from "class-validator";
import { ShoppingCartItem } from "src/entity/shop_cart_item.entity";
import { User } from "src/entity/user.entity";

export class CreateShoppingCartDto {

    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    items:ShoppingCartItem[]
}
