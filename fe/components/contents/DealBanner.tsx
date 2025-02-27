"use client";
import React from "react";
import CountDownTime from "../ui/CountDownTime";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductsContainer from "./ProductsContainer";
import Image from "next/image";
import ProductSwiperItem from "../ui/ProductSwiperItem";
export default function DealBanner({ yearEnd, monthEnd, dayEnd }: any) {
  return (
    <div className="min-h-full w-full py-3">
      <div className="md:flex flex-row">
        <div className=" bg-[url('/banners/exclusive.jpg')] bg-center bg-cover min-h-full h-[85vh] w-full flex flex-col justify-center items-center ">
          <h3 className="text-4xl font-medium text-white text-center">
            Exclusive Hot Deal Ends Soon!
          </h3>
          <p className="text-white text-center ">
            Who are in extremely love with eco friendly system.
          </p>
          <CountDownTime
            yearEnd={yearEnd}
            monthEnd={monthEnd}
            dayEnd={dayEnd}
          />
        </div>

        <div className="w-full flex justify-center items-center ">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            watchSlidesProgress
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation
            className="px-4 md:my-0 my-12 md:w-[40rem]"
          >
            <SwiperSlide className="mx-0">
              <ProductSwiperItem />
            </SwiperSlide>
            <SwiperSlide className="mx-0">
              <ProductSwiperItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
