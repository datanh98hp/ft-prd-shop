import { IsNotEmpty } from "class-validator";

export class CreateBrandDto {
    @IsNotEmpty()
    brand_name: string;
    // @IsNotEmpty()
    logo: string;
}