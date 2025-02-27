import React from 'react'
import Image from "next/image";
export default function ProductItemDeal() {
  return (
    <div className="products md:my-0 my-2 md:mx-4 flex flex-row items-center gap-2 h-fit">
      <Image
        src={"/products/p1.jpg"}
        width={80}
        height={80}
        alt="img"
        className="rounded-md"
      />
      <div className="ml-1">
        <p className="font-light text-sm">BLACK LACE HEELS</p>
        <p className="font-semibold text-sm">
          $189.00{" "}
          <span className="line-through text-sm text-gray-500">$210.00</span>{" "}
        </p>
      </div>
    </div>
  );
}
