"use client";
import { InputTime, calculateTimeLeft } from "@/libs/caculateTime";
import React, { useEffect, useState } from "react";

// ...
export default function CountDownTime({
  yearEnd,
  monthEnd,
  dayEnd,
}: InputTime) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft({
      yearEnd,
      monthEnd,
      dayEnd,
    })
  );
  useEffect(() => {
    setTimeout(
      () =>
        setTimeLeft(
          calculateTimeLeft({
            yearEnd,
            monthEnd,
            dayEnd,
          })
        ),
      1000
    );
  }, [timeLeft]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="text-center text-white flex flex-row gap-6 my-6 bg-black bg-opacity-40 p-4 rounded-md">
      <div className="counter-item flex flex-col gap-2 border-r p-4 w-[6rem]">
        <span className="value text-xl font-bold">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className="label">Day</span>
      </div>

      <div className="counter-item flex flex-col gap-2 border-r p-4 w-[6rem]">
        <span className="value text-xl font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="label">Hours</span>
      </div>

      <div className="counter-item flex flex-col gap-2 border-r p-4 w-[6rem]">
        <span className="value text-xl font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="label">Minutes</span>
      </div>

      <div className="counter-item flex flex-col gap-2  p-4 w-[6rem]">
        <span className="value text-xl font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="label">Second</span>
      </div>
    </div>
  );
}
