import { IsNotEmpty } from 'class-validator';
import { Address } from 'src/entity/address.entity';
import { User } from 'src/entity/user.entity';

export class CreateUserAddressDto {
  
  user: User;
  @IsNotEmpty()
  country: Address;
  //   @IsNotEmpty()
  isDefault: boolean;
}
