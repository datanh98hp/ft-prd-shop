"use client";
import Image from "next/image";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";

export default function ReviewProductContainer() {
  return (
    <div className="md:flex my-8">
      <div className="md:w-1/2  ">
        <div className="md:flex gap-2 flex">
          <div className="w-1/2 text-center my-4">
            <div className="px-4 py-7 mx-8 bg-[#e8f0f2]">
              <p className="font-semibold text-2xl">Overall</p>
              <p className="font-bold text-5xl text-orange-400">4.0</p>
              <p className="text-gray-400">(03 reviews)</p>
            </div>
          </div>
          <div className="w-1/2 my-4">
            <p className="text-xl font-semibold">Base on 3 Reviews</p>
            <p className="flex items-center mr-4">
              <span>05 star</span>
              <span className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <IoMdStar key={i} size={20} color="orange" />
                  ))}
              </span>
              <span className="ml-2">03</span>
            </p>
            <p className="flex items-center mr-4">
              <span>04 star</span>
              <span className="flex">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <IoMdStar key={i} size={20} color="orange" />
                  ))}
                <IoMdStar size={20} color="white" />
              </span>
              <span className="ml-2">03</span>
            </p>
            <p className="flex items-center mr-4">
              <span>03 star</span>
              <span className="flex">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <IoMdStar key={i} size={20} color="orange" />
                  ))}
                <IoMdStar size={20} color="white" />
                <IoMdStar size={20} color="white" />
              </span>
              <span className="ml-2">03</span>
            </p>
            <p className="flex items-center mr-4">
              <span>02 star</span>
              <span className="flex">
                {Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <IoMdStar key={i} size={20} color="orange" />
                  ))}
                <IoMdStar size={20} color="white" />
                <IoMdStar size={20} color="white" />
                <IoMdStar size={20} color="white" />
              </span>
              <span className="ml-2">03</span>
            </p>
            <p className="flex items-center mr-4">
              <span className="mr-[2px]">01 star</span>
              <span className="flex">
                {Array(1)
                  .fill(0)
                  .map((_, i) => (
                    <IoMdStar key={i} size={20} color="orange" />
                  ))}
                <IoMdStar size={20} color="white" />
                <IoMdStar size={20} color="white" />
                <IoMdStar size={20} color="white" />
                <IoMdStar size={20} color="white" />
              </span>
              <span className="ml-2">03</span>
            </p>
          </div>
        </div>
        <div className="md:flex mx-4">
          <div className="list_reviews">
            <ReviewClientItem
              avatar="/products/e-p1.png"
              name="Blake Ruiz"
              content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
              rating={5}
              date="2 days ago"
            />
            <ReviewClientItem
              avatar="/products/e-p1.png"
              name="Blake Ruiz"
              content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
              rating={5}
              date="2 days ago"
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 p-4">
        <FormReviewProduct />
      </div>
    </div>
  );
}

export function ReviewClientItem({
  avatar,
  name,
  rating,
  content,
  date,
}: {
  avatar: string;
  name: string;
  rating: number;
  content?: string;
  date?: string;
}) {
  return (
    <div className="review_item">
      <div className="flex gap-4">
        <Image
          src={avatar}
          alt="product"
          width={100}
          height={100}
          sizes={"100vh"}
          className="object-cover h-[3rem] w-[3rem] rounded-full"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="flex mt-2 -ml-1">
            {Array(rating)
              .fill(0)
              .map((_, i) => (
                <IoMdStar key={i} size={20} color="orange" />
              ))}
          </p>
        </div>
      </div>
      <div className="text-sm my-3 text-gray-500">{content}</div>
    </div>
  );
}

export function FormReviewProduct() {
  const [rate, setRate] = useState(1);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <div>
        <h5 className="text-xl font-semibold">Add a review</h5>
        <form className="text-sm">
          <div className="my-2 mr-6 flex items-center">
            <p className="mr-3">Youre rate </p>
            <div>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                //console.log(rate);
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rate"
                      value={currentRating}
                      className="hidden"
                      onChange={() => setRate(currentRating)}
                    />
                    <span
                      className="star"
                      style={{
                        color:
                          currentRating <= (hover || rate)
                            ? "#ffc107"
                            : "#e4e5e9",
                      }}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <span className="text-4xl">&#9733;</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="my-2 mr-6 flex items-center">
            <label className="mr-2 w-[6rem]" htmlFor="fullname">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your fullname"
              className=" border-[0.05rem] w-full outline-none p-2"
            />
          </div>
          <div className="my-2 mr-6 flex items-center">
            <label className="mr-2 w-[6rem]" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className=" border-[0.05rem] w-full outline-none p-2 "
            />
          </div>
          <div className="my-2 mr-6 flex items-start">
            <label className="mr-2 w-[6rem]" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              cols={10}
              placeholder="Enter your message"
              className=" border-[0.05rem] resize-none w-full outline-none p-2 "
            />
          </div>
          <div className="my-2 mr-6 flex flex-row-reverse">
            <button className="p-2 mt-4 bg-orange-300 text-white">
              Submit now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
