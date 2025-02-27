import React from "react";

export default function BannerCommon({ title }: { title : string }) {
  return (
    <div className="banner bg-banner-image bg-center bg-cover w-screen h-[45%] text-black">
      <div className="md:p-32 p-4 md:flex flex-col md:justify-start  justify-center items-end">
        <h2 className="text-5xl font-bold mt-32 md:mt-20">{title}</h2>
        <p className="md:text-white text-black font-semibold">{`HOME -> ${title.toUpperCase()}`}</p>
      </div>
    </div>
  );
}
