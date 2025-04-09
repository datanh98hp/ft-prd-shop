import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'Unit number is required' })
  unit_number: string;
  @IsNotEmpty({ message: 'Stress number is required' })
  stress_number: string;
  @IsNotEmpty({message: 'Address is required'})
  address_line_1: string;

  address_line_2: string;
  @IsNotEmpty({ message: 'City name is required' })
  city: string;
  @IsNotEmpty({ message: 'Postal code is required' })
  @IsNumber({})
  postal_code: string;
}
