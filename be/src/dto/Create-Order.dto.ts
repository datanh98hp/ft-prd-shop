
import { Address } from "src/entity/address.entity";
import { OrderLine } from "src/entity/order_line.entity";
import { OrderStatus } from "src/entity/order_status.entity";
import { ShippingMethod } from "src/entity/shipping_method.entity";
import { User } from "src/entity/user.entity";
import { UserPaymentMethod } from "src/entity/user_payment_method.entity";

export class CreateOrderDto {
    user: User;
    // orderDate: Date;
    payment_method: UserPaymentMethod;
    shipping_address: Address;
    shippingMethod: ShippingMethod;
    order_total: number;
    order_status: OrderStatus;
    order_lines: OrderLine[];
}