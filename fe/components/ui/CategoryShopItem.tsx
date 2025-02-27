"use client";
import { useFilterStore } from "@/store/filter-product.store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

export default function CategoryShopItem({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const { state, setStateFilter } = useFilterStore();
  const { page, items_per_page, sortBy, product_cate_id } = state;
  const route = useRouter();
  const handleClickCategory = (id_category: number) => {
    // set filter category in store

    setStateFilter({ ...state, product_cate_id: id_category });
    //save params to localstore
    localStorage.removeItem("searchParams");
    localStorage.setItem("searchParams", JSON.stringify(state));
    route.push(
      `/shop?page=${page}&items_per_page=${
        items_per_page || ""
      }&sortBy=${sortBy}&product_cate_id=${id_category}`
    );
  };

  return (
    <div
      onClick={() => handleClickCategory(id)}
      className="ml-1 border-b w-full "
    >
      <button
        className={clsx(
          "p-3 flex justify-between items-center text-lg tracking-wide border-4 border-transparent active:text-white duration-300 border-b w-full hover:text-gray-700 font-medium",
          product_cate_id === id ? "text-orange-500" : ""
        )}
      >
        {title}
      </button>
    </div>
  );
}
