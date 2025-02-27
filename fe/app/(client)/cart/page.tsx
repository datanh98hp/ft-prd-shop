import BannerCommon from "@/components/common/BannerCommon";
import TableProductsCart from "@/components/contents/TableProductsCart";
import React from "react";

export default function CartPage() {
  return (
    <div className="">
      <BannerCommon title="Shoping Cart" />
      <TableProductsCart />
    </div>
  );
}
