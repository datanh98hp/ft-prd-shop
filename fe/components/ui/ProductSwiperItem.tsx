import React from "react";
import Image from "next/image";
import { CiShoppingBasket } from "react-icons/ci";
export default function ProductSwiperItem() {
  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <Image
        src="/products/e-p1.png"
        alt="product"
        width={400}
        height={400}
        className="object-cover h-[25rem] w-[25rem]"
      />
      <p className="text-xl uppercase text-center">
        <span className="mx-2 text-balance font-medium">$ 200</span>
        <span className="mx-2 text-balance font-medium line-through text-gray-500">
          $ 220
        </span>
      </p>
      <p className="text-xl font-semibold uppercase text-center w-[25rem]">
        addidas New Hammer sole for Sports person
      </p>
      <div className="flex flex-row items-center">
        <button className="btn btn-primary p-1 my-3 rounded-full bg-orange-500 ">
          <CiShoppingBasket size={30} color="white" />
        </button>
        <span className="mx-2">Add to cart</span>
      </div>
    </div>
  );
}
