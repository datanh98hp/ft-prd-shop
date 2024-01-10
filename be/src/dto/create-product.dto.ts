import { IsNotEmpty } from "class-validator";
import { ProductCategory } from "src/entity/product_category.entity";

export class CreateProductDto {
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    description:string;
    @IsNotEmpty()
    product_images:string;
    @IsNotEmpty()
    category:ProductCategory;

}
