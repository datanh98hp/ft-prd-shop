import BannerCommon from "@/components/common/BannerCommon";
import DealOfTheWeek from "@/components/contents/DealOfTheWeek";
import FormFilterProducts from "@/components/contents/FormFilterProducts";
import CategoryShopItem from "@/components/ui/CategoryShopItem";
import Dropdown from "@/components/ui/Dropdown";
import axiosClient from "@/libs/axios";

import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Shop",
  description: "Dat anh Shoe - list products",
};
///get category product
interface CategoryDataProp {
  id: number;
  category_name: string;
  parent_category: CategoryDataProp;
  child_categories: CategoryDataProp[];
}
export async function getListCategory(): Promise<any> {
  try {
    const res = await axiosClient.get("/product-category");

    const data = res.data;
    return data;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getListCategory();
  // console.log(data);
  return (
    <>
      <BannerCommon title="Shop" />
      <div className="md:flex gap-4 justify-center md:my-24 my-20 md:mx-0">
        <div className="shadow-xl md:min-w-fit h-fit md:min-h-svh">
          <div className="py-5 pl-6 md:w-48 bg-[#828bb3] md:border-b-0 border-b-[0.01]">Browse Categories</div>
          <div className="">
            {data?.map((item: CategoryDataProp, index: number) => {
              if (item.child_categories.length > 0) {
                // if (item.parent_category === null) {
                return (
                  <Dropdown
                    key={index}
                    absolute={false}
                    tile={item.category_name}
                    list={item.child_categories}
                  />
                );
                // }
              } else {
                if (item.parent_category === null) {
                  return (
                    <CategoryShopItem
                      key={index}
                      title={item.category_name}
                      id={item.id}
                    />
                  );
                }
              }
            })}
          </div>
        </div>

        <div className="md:w-[63rem]">
          <FormFilterProducts />
          {/* list product */}
          <>{children}</>
        </div>
      </div>
      <div className="md:flex flex-col w-screen items-center ">
        <DealOfTheWeek />
      </div>
    </>
  );
}
