import { ShopOrder } from "src/entity/shop_order.entity";
import { User } from "src/entity/user.entity";

export class CreateUserReviewDto {

    rate_vaue: number;

    comment: string;

    user: User;

    revirew_order: ShopOrder;

}
