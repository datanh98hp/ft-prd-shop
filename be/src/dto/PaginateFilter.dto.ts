export class PaginateFilter {
    // required params
    page: string;
    items_per_page: string;
    sortBy: string;
    keyword: string;
    //add option for Product_category
    variation_id?: string;
    promotion_id?: string;
}