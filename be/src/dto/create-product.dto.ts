import { IsEmpty, IsNotEmpty } from "class-validator";
import { Images } from "src/entity/images.entity";
import { ProductCategory } from "src/entity/product_category.entity";

export class CreateProductDto {
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    slug: string;
    @IsNotEmpty()
    description:string;
    @IsEmpty()
    product_images?: Images[];
    @IsNotEmpty()
    category:ProductCategory;
}
