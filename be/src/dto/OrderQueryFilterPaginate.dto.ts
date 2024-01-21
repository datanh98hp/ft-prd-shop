
import { PartialType } from "@nestjs/mapped-types";
import { PaginateFilter } from "./PaginateFilter.dto";

export class OrderQueryFilterPaginate extends PartialType(PaginateFilter) {
    // page: string;
    // items_per_page: string;
    // sortBy: string;
    // keyword: string;
    userId: number;
    order_date:string;
    order_status:number;
    paymentMethod:number;
    shipMethod:number;
}