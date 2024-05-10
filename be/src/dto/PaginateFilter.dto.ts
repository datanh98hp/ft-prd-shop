export class PaginateFilter {
    // required params
    page: string;
    items_per_page: string;
    sortBy: string;
    keyword: string;
    //add option for Product_category
    variation_id?: string;
    promotion_category_id?: string;
    /// add option for Product_item
    sku?: string;
    product_id?: string;
    
}