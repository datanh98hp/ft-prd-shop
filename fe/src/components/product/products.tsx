"use client";
import { useState } from "react";
import ProductItem from "./productItem";
import styles from "./products.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const Products = () => {
  return (
    <>
      <Swiper
        spaceBetween={40}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <ProductItem
            className={styles.productItem}
            image="https://koinclothing.vn/wp-content/uploads/2023/11/ao-thun-stay-wild-koin-4-800x1067.webp"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem
            className={styles.productItem}
            image="https://koinclothing.vn/wp-content/uploads/2023/11/ao-thun-stay-wild-koin-4-800x1067.webp"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem
            className={styles.productItem}
            image="https://koinclothing.vn/wp-content/uploads/2023/11/ao-thun-stay-wild-koin-4-800x1067.webp"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem
            className={styles.productItem}
            image="https://koinclothing.vn/wp-content/uploads/2023/11/ao-thun-stay-wild-koin-4-800x1067.webp"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Products;
