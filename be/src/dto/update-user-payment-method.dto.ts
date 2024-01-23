import { PartialType } from "@nestjs/mapped-types";
import { CreateUserPaymentMethodDto } from "./create-user-payment-method.dto";

export class UpdateUserPaymentMethodDto extends PartialType(CreateUserPaymentMethodDto) {

}