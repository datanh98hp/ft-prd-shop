"use client";
import ProductItem from "@/components/ui/ProductItem";
import useCallApi from "@/libs/api/useCallApi";
import { ProductType, ProductItems } from "@/libs/types";
import { useCartStore } from "@/store/cart.store";
import { useFilterStore } from "@/store/filter-product.store";
import { VscLoading } from "react-icons/vsc";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";

export default function ListProductsShop() {
  const router = useRouter();
  //get params data from url
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const items_per_page = searchParams.get("items_per_page");

  const product_cate_id = searchParams.get("product_cate_id");
  const sortBy = searchParams.get("sortBy");
  const keyword = searchParams.get("keyword");
  // console.log(
  //   "searchParams",
  //   searchParams.forEach((key, value) => console.log(key, value))
  // );
  // const { state, setStateFilter } = useFilterStore((state: any) => ({
  //   state,
  //   setStateFilter: state.setStateFilter,
  // }));
  // console.log(state);

  // const { page, items_per_page, sortBy, product_cate_id } = state;

  let oldParams = null;
  const currentSearchParams = {
    keyword,
    items_per_page: Number(items_per_page),
    page: Number(page),
    sortBy,
    product_cate_id: Number(product_cate_id),
  };
  // useEffect(() => {
  //   //
  //   // const oldSearchParams = window.localStorage.getItem("searchParams");
  //   // oldParams = JSON.parse(oldSearchParams || "{}");
  //   // console.log("searchParamsObjFromLocal", oldParams);
  //   // console.log("searchParamsObj", currentSearchParams);
  // }, []);

  const { data, error, isLoading } = useSWR(
    `/product?page=${page}&items_per_page=${
      items_per_page || ""
    }&sortBy=${sortBy}&product_cate_id=${product_cate_id || ""}&keyword=${
      keyword || ""
    }`,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    
      loadingTimeout: 5000,
      //refreshInterval: 15000,
    }
  );
  let list = data?.data.data || [];

  //console.log(data);

  const { total, currentPage, nextPage, previousPage, lastPage } =
    data?.data || {};
  /// console.log("other data ", data?.data);
  const pageCount = total / Number(items_per_page);
  // const { cart, addToCart } = useCartStore((state: any) => ({
  //   cart: state.cart,
  //   addToCart: state.addToCart,
  // }));
  //get temple data from localstore

  const { cart, addToCart } = useCartStore((state: any) => ({
    cart: state.cart,
    addToCart: state.addToCart,
  }));

  const handlePageClick = (event: any) => {
    router.push(
      `/shop?page=${event.selected + 1}&items_per_page=${
        items_per_page || ""
      }&sortBy=${sortBy}&product_cate_id=${product_cate_id || ""}&keyword=${
        keyword || ""
      }`
    );
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full h-full h-50 w-50 flex justify-center mt-4">
          <VscLoading className="animate-spin mx-4" lightingColor={"#ffba00"} />
          <span>Loading...</span>
        </div>
      )}
      {error && <div>Error fetching data</div>}
      <div className="w-full flex flex-wrap items-center md:gap-2">
        {list?.map((product: ProductType) => (
          <ProductItem
            key={product.id}
            id={`${product.id}`}
            slug={product.slug}
            src={
              product.product_images[0]?.path
                ? `${" http://localhost:8001/"}` +
                  product.product_images[0]?.path
                : "/products/p1.jpg"
            }
            status={product.items.length > 0 ? 1 : 0}
            name={product.name}
            price={product.original_price || 1}
            discount={
              product?.category?.promotion_category?.promotion?.discount_rate ||
              null
            }
            rating={5}
          />
        ))}
      </div>
      <div className="mt-4">
        <ReactPaginate
          className="flex justify-center gap-2 items-center "
          breakLabel="..."
          marginPagesDisplayed={3}
          nextLabel="Next >"
          nextClassName={nextPage ? "text-gray-400" : ""}
          onPageChange={handlePageClick}
          // pageRangeDisplayed={2}
          pageCount={lastPage} ////
          // previousClassName="underline"
          previousLinkClassName={
            Number(currentSearchParams.page) === 1 ? "text-gray-400" : ""
          }
          previousClassName={previousPage ? "text-gray-400" : ""}
          previousLabel="< Previous"
          pageClassName="border px-2 rounded-full"
          // pageLinkClassName="underline"
          activeClassName="bg-orange-400 text-white"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
