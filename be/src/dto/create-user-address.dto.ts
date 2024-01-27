import { Country } from "src/entity/country.entity";
import { User } from "src/entity/user.entity";

export class CreateUserAddressDto {
    user:User;
    isDefault: boolean;
    unit_number: string;
    stress_number: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    postal_code: string;
    country: Country;
}
