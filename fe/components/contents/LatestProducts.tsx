"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductsContainer from "./ProductsContainer";
export default function LatestProducts() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop={true}
      watchSlidesProgress
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      className="w-full my-3"
    >
      <SwiperSlide className="">
        <ProductsContainer
          title="Latest Products"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
          explicabo illo consequatur consectetur quas quasi atque impedit, quis,
          iure delectus laborum provident vitae temporibus rem velit quia odio
          ad amet!"
        />
      </SwiperSlide>
      <SwiperSlide>
        <ProductsContainer
          title="Best sale Products"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
          explicabo illo consequatur consectetur quas quasi atque impedit, quis,
          iure delectus laborum provident vitae temporibus rem velit quia odio
          ad amet!"
        />
      </SwiperSlide>
    </Swiper>
  );
}
