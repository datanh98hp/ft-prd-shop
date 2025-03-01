export class PaginateFilter {
    // required params
    page?: string | number;
    items_per_page?: string | number;
    sortBy?: string;
    keyword?: string;
    //add option for Product_category
    variation_id?: string;
    promotion_category_id?: string;
    /// add option for Product_item
    sku?: string;
    product_id?: string;
    
    constructor(data: PaginateFilter) {
        Object.assign(this, data);
    }
}