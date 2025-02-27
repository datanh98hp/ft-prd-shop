import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Dat anh Shoe register",
};
export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
