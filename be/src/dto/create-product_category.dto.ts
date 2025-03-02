import { ProductCategory } from "src/entity/product_category.entity";
import { PromotionCategory } from "src/entity/promotion_category.entity";

export class CreateProductCategoryDto {
    category_name:string;
    category_img?:string;
    parent_category?: ProductCategory;
    promotion_category?: PromotionCategory;
}
