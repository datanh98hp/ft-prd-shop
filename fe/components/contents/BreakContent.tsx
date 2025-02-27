"use client";
import React from "react";
import { BiSupport } from "react-icons/bi";
import { BsStack } from "react-icons/bs";
import { HiCircleStack } from "react-icons/hi2";
import { TfiTruck, TfiReload } from "react-icons/tfi";

export default function BreakContent() {
  return (
    <div className="md:mx-36 p-4 flex flex-wrap justify-center items-center md:gap-3 gap-4 shadow-xl">
      <div className="flex flex-col justify-center items-center gap-3 p-8 md:hover:shadow-xl md:hover:rounded-md">
        <TfiTruck size={30} />
        <h3 className="text-base font-semibold "> Fastest Delivery</h3>
        <p className="text-sm">Fastest Shipping on all order</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-3  p-8 md:hover:shadow-xl md:hover:rounded-md">
        <TfiReload size={30} />
        <h3 className="text-base font-semibold ">Return Policy</h3>
        <p className="text-sm">Free Shipping on all order</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-3  p-8 md:hover:shadow-xl md:hover:rounded-md">
        <BiSupport size={30} />
        <h3 className="text-base font-semibold ">24/7 Support</h3>
        <p className="text-sm">Support on all order</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 p-8 md:hover:shadow-xl md:hover:rounded-md">
        <BsStack size={30} />
        <h3 className="text-base font-semibold ">Easy Tracking</h3>
        <p className="text-sm">Convinient Shipping on all order</p>
      </div>
    </div>
  );
}
