import ListProductsShop from "@/components/contents/ListProductsShop";
import axiosClient from "@/libs/axios";
import axios from "axios";
import React from "react";
interface FilterProductProps {
  page: string | number;
  items_per_page?: number;
  sortBy?: string;
  product_cate_id?: string | number | undefined;
// }
// async function getListProduct({
//   page = 1,
//   items_per_page = 10,
//   sortBy = "DESC",
//   product_cate_id,
// }: FilterProductProps) {
//   try {
//     const res = await axiosClient.get(
//       `/product?page=${page}&items_per_page=${
//         items_per_page || ""
//       }&sortBy=${sortBy}&product_cate_id=${product_cate_id || ""}`
//     );
//     //console.log(res.data.data);
//     return res.data.data;
//   } catch (error) {
//     return [];
//   }
}

export default function ShopPage() {
 
  //Get data
  // const data = await getListProduct({
  //   page: 1,
  //   items_per_page : 10,
  //   sortBy : "DESC",
  //   product_cate_id:undefined,
  // });

  return (
    <div className="w-full flex flex-row flex-wrap justify-between gap-1 md:justify-start ">
      <ListProductsShop />
    </div>
  );
}
