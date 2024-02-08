"use client";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams<{ id: string; slug: string }>();

  console.log(params.id);
  const id = params.id.split("!")[0];
  console.log(id);

  return (
    <>
      <div>Detail Product</div>
    </>
  );
}
