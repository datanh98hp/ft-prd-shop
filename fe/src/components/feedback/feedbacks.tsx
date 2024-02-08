"use client";
import FeedbackItem from "./feedbackItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Feedbacks = () => {
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <FeedbackItem
            image="https://koinclothing.vn/wp-content/uploads/2023/10/feedback-khach-hang-koin-1.webp"
            alt="Feedback"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeedbackItem
            image="https://koinclothing.vn/wp-content/uploads/2023/10/feedback-khach-hang-koin-1.webp"
            alt="Feedback"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeedbackItem
            image="https://koinclothing.vn/wp-content/uploads/2023/10/feedback-khach-hang-koin-1.webp"
            alt="Feedback"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Feedbacks;
