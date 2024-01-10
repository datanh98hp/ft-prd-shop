import { Product } from "src/entity/product.entity";

export class CreateProductItemDto {
    
    sku: string;
    qty_in_stock: number;
    product_images: string;
    price: number;
    product: Product;

}
