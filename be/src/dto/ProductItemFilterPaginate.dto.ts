import { PartialType } from "@nestjs/mapped-types";
import { PaginateFilter } from "./PaginateFilter.dto";

export class ProductItemFilterPaginateDto extends PartialType(PaginateFilter) {
    sku: string;
    qty_in_stock ?: number;
    price ?: number;
    product_id ?:number;
    startPrice?:number;
    endPrice?: number;
}