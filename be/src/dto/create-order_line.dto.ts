import { ProductItem } from "src/entity/product_item.entity";
import { ShopOrder } from "src/entity/shop_order.entity";

export class CreateOrderLineDto {

    qty: number;

    price: number;

    product_item: ProductItem;

    order: ShopOrder
}