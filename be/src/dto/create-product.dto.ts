import { IsEmpty, IsNotEmpty } from "class-validator";
import { ImagesProduct } from "src/entity/images_product.entity";
import { ProductCategory } from "src/entity/product_category.entity";

export class CreateProductDto {
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    slug: string;
    @IsNotEmpty()
    description:string;
    @IsEmpty()
    product_images?:ImagesProduct[];
    @IsNotEmpty()
    category:ProductCategory;
}
