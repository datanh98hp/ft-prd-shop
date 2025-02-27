"use client";
import React from "react";
import ProductItemDeal from "./ProductItemDeal";
import Image from "next/image";
export default function DealOfTheWeek() {
  return (
    <div className="my-16">
      <div className="">
        <h4 className="font-medium text-4xl text-center">Deals of the Week</h4>
        <p className="max-w-2xl mx-auto text-center my-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="md:flex mx-4 my-12">
          <div className="flex md:flex-row flex-wrap gap-1 md:w-[50rem] md:ml-0 ">
            <ProductItemDeal />
            <ProductItemDeal />
            <ProductItemDeal />
            <ProductItemDeal />
            <ProductItemDeal />
            <ProductItemDeal />
            <ProductItemDeal />
            <ProductItemDeal />
            <ProductItemDeal />
          </div>
          <Image
            src={"/products/p1.jpg"}
            width={200}
            height={150}
            alt="img"
            className="hidden md:block"
          />
        </div>
      </div>
    </div>
  );
}
