"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./swiper_product.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SwiperProduct({
  listImage,
}: {
  listImage?: Array<{ path: string } | null>;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={
          {
            // "--swiper-navigation-color": "#fff",
            // "--swiper-pagination-color": "#fff",
          }
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {listImage &&
          listImage?.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                width={40}
                height={40}
                alt={"image"}
                sizes="100vh"
                style={{ width: "100%", height: "40rem" }}
                priority={true}
                className="object-fit md:h-[20rem] h-[20rem] md:min-h-0 overflow-hidden"
                src={`${" http://localhost:8001/"}` + item?.path}
              />
            </SwiperSlide>
          ))}
        {listImage?.length === 0 && (
          <>
            <SwiperSlide>have not images</SwiperSlide>
          </>
        )}
        {/* <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-5.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-6.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-7.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-8.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-9.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-10.jpg"
          />
        </SwiperSlide> */}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper as any}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {listImage &&
          listImage?.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                width={40}
                height={40}
                alt={item?.path ? item?.path : "image"}
                sizes="100vh"
                style={{ width: "100%", height: "10rem" }}
                priority={true}
                className="object-fit md:h-[20rem] h-[20rem] md:min-h-0 overflow-hidden"
                src={`${" http://localhost:8001/"}` + item?.path}
              />
            </SwiperSlide>
          ))}
        {listImage?.length === 0 && (
          <>
            <SwiperSlide>have not images</SwiperSlide>
          </>
        )}
        {/* 
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-5.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-6.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-7.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-8.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-9.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={40}
            height={40}
            alt={"image"}
            sizes="100vh"
            style={{ width: "100%", height: "fit-content" }}
            priority={true}
            className="object-fit md:h-[20rem] h-full md:min-h-0 overflow-hidden"
            src="https://swiperjs.com/demos/images/nature-10.jpg"
          />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
