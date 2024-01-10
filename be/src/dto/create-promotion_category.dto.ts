import { ProductCategory } from "src/entity/product_category.entity";
import { Promotion } from "src/entity/promotion.entity";


export class CreatePromotionCategoryDto {
    category: ProductCategory;
    promotion: Promotion;
}
