"use client";
import { useFilterStore } from "@/store/filter-product.store";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
export default function GridLayoutCatagory({
  categories,
}: {
  categories: [any];
}) {
  const { state, setStateFilter } = useFilterStore();
  const router = useRouter();
  // console.log(categories);
  const handleClick = (id: number) => {
    setStateFilter({ ...state, product_cate_id: id });
    //save params to localstore
    localStorage.removeItem("searchParams");
    localStorage.setItem("searchParams", JSON.stringify(state));
    router.push(
      `/shop?page=1&items_per_page=6&sortBy=DESC&product_cate_id=${id}`
    );
  };
  return (
    <div className="my-14 md:mx-36">
      <div className="md:grid px-2 md:mx-2 grid-cols-4 auto-cols-max gap-4 text-wrap text-center">
        {categories?.map((category, index) => {
          if (index === 0 || index === 4) {
            return (
              <div
                className="col-span-2 relative h-[14rem] cursor-pointer"
                key={index}
                onClick={() => handleClick(category?.id)}
              >
                {/* <Link
                  href={`/shop?page=1&&items_per_page=6&sortBy=DESC&product_cate_id=${category?.id}`}
                > */}
                <div
                  className="absolute inset-0 bg-cover bg-center z-0 "
                  style={{ backgroundImage: `url(/category/c1.jpg)` }}
                ></div>
                <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-10 z-10 flex justify-center items-center text-2xl text-white font-semibold">
                  {category?.category_name}
                </div>
                {/* </Link> */}
              </div>
            );
          } else if (index === 1 || index === 3) {
            return (
              <div
                className="row-span-1  relative h-full  cursor-pointer"
                key={index}
                onClick={() => handleClick(category?.id)}
              >
                {/* <Link
                  href={`/shop?page=1&&items_per_page=6&sortBy=DESC&product_cate_id=${category?.id}`}
                > */}
                <div
                  className="absolute inset-0 bg-cover bg-center z-0 "
                  style={{ backgroundImage: `url(/category/c1.jpg)` }}
                ></div>
                <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-10 z-10 flex justify-center items-center text-2xl text-white font-semibold">
                  {category?.category_name}
                </div>
                {/* </Link> */}
              </div>
            );
          } else {
            return (
              <div
                className="row-span-2  relative h-full  cursor-pointer"
                key={index}
                onClick={() => handleClick(category?.id)}
              >
                {/* <Link
                  href={`/shop?page=1&&items_per_page=6&sortBy=DESC&product_cate_id=${category?.id}`}
                > */}
                <div
                  className="absolute inset-0 bg-cover bg-center z-0 "
                  style={{ backgroundImage: `url(/category/c1.jpg)` }}
                ></div>
                <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-10 z-10 flex justify-center items-center text-2xl text-white font-semibold">
                  {category?.category_name}
                </div>
                {/* </Link> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
