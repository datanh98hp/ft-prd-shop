import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Login",
  description: "Dat anh Shoe login",
};
export default function LayoutLogin({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
