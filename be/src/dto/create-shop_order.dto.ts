
import { Address } from "cluster";
import { OrderStatus } from "src/entity/order_status.entity";
import { ShippingMethod } from "src/entity/shipping_method.entity";
import { User } from "src/entity/user.entity";
import { UserPaymentMethod } from "src/entity/user_payment_method.entity";

export class CreateShopOrderDto {
    user: User;
    orderDate: string;
    payment_method: UserPaymentMethod;
    shipping_address: Address;
    shippingMethod: ShippingMethod;
    order_total: number;
    order_status: OrderStatus;
    soft_deleted: boolean;
}
