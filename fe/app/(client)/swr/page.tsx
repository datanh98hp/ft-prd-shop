"use client";
import React from "react";
import useSWR from "swr";
export default function SWR() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "https://fakestoreapi.com/products"
  );
  console.log(data)
  return (
      <div>
        <p>{data?.[0].title}</p>
      </div>
  );
}
