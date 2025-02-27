import React from "react";
import ProductItem from "../ui/ProductItem";

export default function ProductsContainer({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="md:mx-36 flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold text-center">{title}</h2>
        <p className="md:w-fit md:max-w-[50%] px-2 text-center my-4">
          {description}
        </p>
      </div>
      <div className="my-4 flex md:flex-row flex-col items-center justify-center md:flex-wrap gap-3 md:max-w-[75rem] ">
        {/* product_item */}
        {/* prod */}
        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={5}
          rating={4.5}
        />
        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={6}
          rating={4.5}
        />
        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={6}
          rating={4.5}
        />
        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={5}
          rating={4.5}
        />
        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={5}
          rating={4.5}
        />
        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={5}
          rating={4.5}
        />

        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={5}
          rating={4.5}
        />

        <ProductItem
          src="/products/p1.jpg"
          alt="product"
          name="addidas New Hammer sole for Sports person"
          price={150}
          discount={5}
          rating={4.5}
        />
      </div>
    </div>
  );
}
