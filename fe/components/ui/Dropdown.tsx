"use client";
import { useFilterStore } from "@/store/filter-product.store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
export default function Dropdown({
  list,
  tile,
  absolute,
}: {
  list?: Array<any>;
  tile: string;
  absolute: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
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
      `/shop?page=${page}?items_per_page=${
        items_per_page || ""
      }&sortBy=${sortBy}&product_cate_id=${id_category}`
    );
  };
  return (
    <div className="ml-1 border-b w-full">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          absolute ? "relative" : "",
          isOpen ? "ext-orange-500" : "",
          "p-3 flex justify-between items-center text-lg tracking-wide border-4 border-transparent active:text-white duration-300 border-b  w-full font-medium"
        )}
      >
        <span className="">{tile}</span>
        <span>
          {isOpen ? (
            <FaAngleDown size={20} width={10} />
          ) : (
            <FaAngleUp size={20} />
          )}
        </span>
      </button>

      {isOpen && (
        <div
          className={clsx(
            absolute ? "absolute top-0 left-0 bg-fuchsia-50" : ""
          )}
        >
          {list?.map((item, i) => (
            <div key={item.id} className="ml-4 p-3 border-b">
              <button
                className={clsx(
                  "font-medium",
                  product_cate_id === item.id ? "text-orange-500" : ""
                )}
                onClick={() => handleClickCategory(item.id)}
              >
                {item.category_name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
