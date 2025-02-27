"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import ReviewProductContainer from "@/components/contents/Product/ReviewProductContainer";
import { BiHeart } from "react-icons/bi";
import { PromotionCategory, Variations } from "@/libs/types";
import { MdWhatshot } from "react-icons/md";
import { IoIosStar } from "react-icons/io";

interface ContentProductProps {
  name: string;
  slug: string;
  price: number;
  category: string;
  variations: Variations[];
  promotion_category: PromotionCategory;
  discount: number | null;
  rating?: number;
  status: number; //0: out of stock  | 1: stocking
  des?: string;
}

export default function ContentProduct({
  name,
  slug,
  price,
  category,
  variations,
  promotion_category,
  discount,
  rating,
  status,
  des,
}: ContentProductProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className=" ">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">{name}</p>
      </div>
      <p className="font-bold text-xl text-orange-500">${price}</p>
      <div className="py-4 text-sm">
        <p>
          Category: <span className="text-orange-500 ml-6">{category}</span>
        </p>
        <p>
          <span className="mr-5"> Status: </span>
          {status > 0 ? (
            <span className="ml-6">In Stock</span>
          ) : (
            <span className="ml-6">Out of Stock</span>
          )}
        </p>
      </div>
      <div className="h-[0.01rem] rounded-sm w-full bg-gray-300 " />
      {/* <p className="py-4 text-sm text-gray-400">
        Mill Oil is an innovative oil filled radiator with the most modern
        technology. If you are looking for something that can make your interior
        look awesome, and at the same time give you the pleasant warm feeling
        during the winter.
      </p> */}
      <p className="text-2xl font-semibold mr-16 flex gap-1 my-4">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <IoIosStar key={i} color="orange" size={20} />
          ))}
      </p>
      {promotion_category && promotion_category?.promotion && (
        <div className="flex">
          <div className="text-lg flex items-center p-1 text-orange-500 border border-red-500">
            <span className="mr-2">
              <MdWhatshot />
            </span>
            {promotion_category.promotion.name}
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-2 md:mt-20">
        <input
          className="w-[4rem] h-8 border outline-none rounded-md border-gray-400 px-2"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(+e.target.value)}
          type="number"
        />
        {variations.length > 0 && (
          <div>
            <select
              name="variations"
              className="w-24 h-8 border outline-none rounded-md border-gray-400 px-2"
            >
              {variations.map((item) => (
                <option key={item.id} value={item.id} selected>
                  {item.variation_name}
                </option>
                // <option value={item.id}>{item.variation_name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center mt-3">
        <button className="py-2 px-6 my-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-md hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-400">
          Add to cart
        </button>
        {/* <button className="border border-orange-300  p-2 rounded-full outline-none hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-600 hover:text-white text-black  ">
          <CiShoppingBasket size={25} className=""  />  
        </button> */}
        <button className="border border-orange-300 p-2 rounded-full outline-none hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-600 hover:text-white text-black  ">
          <BiHeart size={25} className="" />
        </button>
      </div>
    </div>
  );
}

export function TabDescriptionProduct({
  description,
  specification,
}: {
  description?: string;
  specification?: string;
}) {
  const [activeTab, setActiveTab] = useState("Specification");

  let listTabs = [
    {
      id: 1,
      title: "Description",
      // content: () => <div>{description}</div>,
    },
    // {
    //   id: 2,
    //   title: "Specification",
    //   // content: () => <div>Content Specification</div>,
    // },
    {
      id: 3,
      title: "Review",
      // content: () => <ReviewProductContainer></ReviewProductContainer>,
    },
  ];

  return (
    <div className=" w-full border md:w-screen justify-center md:mx-12 mx-4">
      <div className="md:flex flex-row gap-3 justify-center text-center bg-gray-200">
        {listTabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.title)}
            className={clsx(
              "py-2 px-6 text-sm my-2 w-[10rem] border",
              activeTab === tab.title
                ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                : ""
            )}
            key={tab.id}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div
        className={clsx("", activeTab === "Description" ? "block" : "hidden")}
        dangerouslySetInnerHTML={{ __html: description || "" }}
      >
     
      </div>
      {/* <div
        className={clsx("", activeTab === "Specification" ? "block" : "hidden")}
      >
        Specification
      </div> */}
      <div className={clsx("", activeTab === "Review" ? "block" : "hidden")}>
        <ReviewProductContainer></ReviewProductContainer>
      </div>
    </div>
  );
}
