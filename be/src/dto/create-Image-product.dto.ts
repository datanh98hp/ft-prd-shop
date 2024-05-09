import { IsNotEmpty } from "class-validator";
import { Product } from "src/entity/product.entity";

export class CreateImageProductDto {
  key?: string;
  @IsNotEmpty()
  path: string;
  @IsNotEmpty()
  product: Product;
}