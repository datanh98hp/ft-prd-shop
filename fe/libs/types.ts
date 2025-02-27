export interface ProductType {
    id: number;
    name: string ;
    slug: string ;
    items: ProductItems[] ;
    original_price: number ;
    category: CategoryType ;
    product_images: ProductImage[];
    promotion_category: PromotionCategory;
    // price: number;
    // discount: number;
    // rating: number;
} 
export interface ProductImage {
    path: string;
}
export interface ProductItems {
    id: number;
    sku: string;
    qty_in_stock: number;
    product_images: string;
    price: number;
    // discount: number;
    // rating: number;
}
export interface CategoryDataType {
    id?: number;
    category_name: string;
    variations: Variations[];
} 
export interface CategoryType {
    id?: number;
    promotion_category: PromotionCategory;
}
export interface PromotionCategory {
    promotion: Promotion;
}
export interface Promotion {
    name: string;
    description: string;
    discount_rate: number;
    start_date: string;
    end_date: string;
}
export interface Variations {
    id?: number;
    category_name: string;
    variation_name: string;
} 


export interface ProductCategory {
    id?: number;
    category_name: number;
    parentCategoryId?: number;
    promotionCategoryId?: number;
} 