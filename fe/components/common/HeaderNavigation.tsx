"use client";
import React, { useState } from "react";
import { CiShoppingBasket, CiUser, CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";

export default function HeaderNavigation() {
  const [isOpenMobile, setOpenMobile] = useState(false);
  const { cart } = useCartStore((state: any) => ({
    cart: state.cart,
  }));

  return (
    <div className="relative scroll-smooth md:scroll-auto z-10">
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        onScrollCapture={() => console.log("scroll-capture")}
        className="fixed bg-[#f8f9fa] text-black h-[5rem] w-full xl:w-[80%] xl:left-[10%]  xl:right-[10%] xl:top-10 shadow-slate-400 drop-shadow-md flex flex-row justify-between md:justify-around items-center p-4 gap-10"
      >
        <div>
          <Image
            src="/imgs/logo.jpg"
            alt="logo"
            width={45}
            height={45}
            priority={true}
            className="rounded-full"
          />
        </div>
        {/* desktop menu */}
        <div className="hidden md:block">
          <ul className="flex justify-center gap-7 uppercase text-md">
            <li className="p-2 hover:text-[#ffba00]">
              <Link href="/">Home</Link>
            </li>
            <li className="p-2 hover:text-[#ffba00]">
              <Link href="/shop">Products</Link>
            </li>
            <li className="p-2 hover:text-[#ffba00]">
              <Link href="/contact">Contact</Link>
            </li>
            {/* <li className="p-2 hover:text-[#ffba00]">
              <Link href="/about">About</Link>
            </li> */}
            <ul className="flex justify-center gap-3">
              <li className="border p-2 hover:text-[#ffba00] rounded-full relative">
                <Link href={"/cart"} className="">
                  <CiShoppingBasket size={25} />
                </Link>
                {cart.length > 0 && (
                  <span className="absolute top-6 -right-2 bg-red-500 text-white rounded-full px-[8px] py-[2px]">
                    {cart.length}
                  </span>
                )}
              </li>
              <li className="border p-2 hover:text-[#ffba00] rounded-full">
                <CiUser size={25} />
              </li>
            </ul>
          </ul>
        </div>
        {/* mobile */}
        <div className="flex md:hidden z-1 bg-[#f8f9fa] text-black">
          <ul className="flex justify-center gap-3 mx-6">
            <li className="border p-1 rounded-full">
              <Link href={"/cart"} className="relative">
                <CiShoppingBasket size={30} />
                {/* <span className="absolute top-0 left-0">âf wr ư</span> */}
                {cart.length > 0 && (
                  <span className="absolute top-6 -right-2 bg-red-500 text-white rounded-full px-[8px] py-[2px]">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="border p-1 rounded-full">
              <CiUser size={30} />
            </li>
          </ul>
          <button
            onClick={() => setOpenMobile(!isOpenMobile)}
            className="p-2 block md:hidden mr-2"
          >
            {isOpenMobile ? (
              <MdOutlinePlaylistRemove size={25} />
            ) : (
              <CiMenuBurger size={25} />
            )}
          </button>
          {/* mobile menu content */}
          {isOpenMobile && (
            <div className="animate-scaleX absolute top-20 left-0 w-full p-4 bg-[#f8f9fa] text-black">
              <ul className="flex flex-col justify-center gap-7 px-2 ">
                <li className="mx-[5px] hover:text-[#ffba00] uppercase">
                  <Link href={"/"}>Home</Link>
                </li>
                <li className="mx-[5px] hover:text-[#ffba00] uppercase">
                  <Link href={"/shop"}>Products</Link>
                </li>
                <li className="mx-[5px] hover:text-[#ffba00] uppercase">
                  <Link href={"/contact"}>Contact</Link>
                </li>
                {/* <li className="mx-[5px] hover:text-[#ffba00] uppercase">
                  About
                </li> */}
              </ul>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
