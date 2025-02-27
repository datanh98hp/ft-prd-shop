import BannerCommon from "@/components/common/BannerCommon";
import DealOfTheWeek from "@/components/contents/DealOfTheWeek";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { id_product: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id_product = params.id_product;

  // find data frim id product
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());
  return {
    title: `Product - ${id_product}`,
    //
  };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BannerCommon title="Product" />
      {children}
      {/* <DealOfTheWeek /> */}
    </>
  );
}
