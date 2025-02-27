"use client";
import React from "react";

export default function EmailInputFooter() {
  return (
    <div className="md:my-4 my-5 mx-0">
      <input
        type="email"
        className="p-[6px] focus:text-nowrap w-[75%]"
        placeholder="Enter your email address"
        onChange={(e) => console.log(e.target.value)}
      />
      <button className="p-[6px] bg-orange-500 w-[25%]">Subscribe</button>
    </div>
  );
}
