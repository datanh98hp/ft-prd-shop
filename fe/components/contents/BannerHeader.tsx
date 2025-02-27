"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function BannerHeader() {

  return (
    <div className="w-screen h-[100vh] relative flex justify-center items-center bg-banner-image bg-center bg-cover bg-no-repeat text-black">
      <Swiper
        className=""
        modules={[Navigation, Pagination]}
        loop={true}
        // navigation={true}
        pagination={{ clickable: true }}
        watchSlidesProgress
        spaceBetween={30}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="p-3 md:p-0 md:flex justify-around items-center bg-transparent">
            <div className="grow-1 mt-12 md:max-w-[30%] md:max-h-[30%] py-4">
              <h2 className="text-5xl font-bold leading-tight">
                Nike New Production !
              </h2>
              <p
                className="md:my-8 text-xl text-slate-500
                leading-tight"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi praesentium reiciendis eos, illo eius voluptatibus
                animi consectetur necessitatibus?.
              </p>
            </div>
            <div className="grow-2 flex justify-center ">
              <Image
                className="md:block hidden"
                src="/products/banner-product-image.png"
                alt="banner"
                width={600}
                height={600}
                priority={true}
                sizes="100vh"
                style={{ width: "100%", height: "auto" }}
              />
              <Image
                className="md:hidden block mt-6"
                src="/products/banner-product-image.png"
                alt="banner"
                width={400}
                height={400}
                sizes="100vh"
                style={{ width: "100%", height: "auto" }}
                priority={true}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-3 md:p-0 md:flex justify-around items-center bg-transparent">
            <div className="grow-1 mt-12 md:max-w-[30%] md:max-h-[30%] py-4">
              <h2 className="text-5xl font-bold leading-tight">
                Nike New Production !
              </h2>
              <p
                className="md:my-8 text-xl text-slate-500
                leading-tight"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi praesentium reiciendis eos, illo eius voluptatibus
                animi consectetur necessitatibus?.
              </p>
            </div>
            <div className="grow-2 flex justify-center ">
              <Image
                className="md:block hidden"
                src="/products/banner-product-image.png"
                alt="banner"
                width={600}
                height={600}
                priority={true}
                sizes="100vh"
                style={{ width: "100%", height: "auto" }}
              />
              <Image
                className="md:hidden block mt-6"
                src="/products/banner-product-image.png"
                alt="banner"
                width={400}
                height={400}
                sizes="100vh"
                style={{ width: "100%", height: "auto" }}
                priority={true}
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
