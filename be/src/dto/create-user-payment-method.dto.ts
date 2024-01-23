import { PaymentType } from "src/entity/payment_type.entity";
import { User } from "src/entity/user.entity";

export class CreateUserPaymentMethodDto {
    // price: string;
    user: User;

    payment_type: PaymentType;

    provider: string;

    account_number: string;

    expiry_date: string;

    is_default: boolean;

}