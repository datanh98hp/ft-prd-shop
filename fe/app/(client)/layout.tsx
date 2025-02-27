import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import { configSWR } from "@/libs/config";
import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import useSWR, { SWRConfig } from "swr";

export const metadata: Metadata = {
  title: "Home",
  description: "Dat anh Shoe",
};
// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };
// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: Props;
//   searchParams: ResolvingMetadata;
// }): Promise<any> {}
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <HeaderNavigation />
      {children}
      <Footer />
    </div>
  );
}
