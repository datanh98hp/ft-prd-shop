import { PartialType } from "@nestjs/mapped-types";
import { PaginateFilter } from "./PaginateFilter.dto";
import { ProductCategory } from "src/entity/product_category.entity";

export class ProductFilterPaginate extends PartialType(PaginateFilter) {
    // page: string;
    // items_per_page: string;
    // sortBy: string;
    // keyword: string;
    category: ProductCategory

}