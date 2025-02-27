"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";
export default function TableProductsCart() {
  const { cart, addToCart } = useCartStore((state: any) => ({
    cart: state.cart,
    addToCart: state.addToCart,
  }));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <section className="flex flex-col justify-center antialiased text-gray-600 p-5 my-12">
      <div className="">
        <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm  border-gray-200 p-2">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">List item cart</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 scroll-smooth">
                  <tr className="">
                    <th className="text-left py-4 w-[35rem]">Product</th>
                    <th className="text-left py-4">Price</th>
                    <th className="text-left py-4">Quantity</th>
                    <th className="text-left ">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 mr-2 sm:mr-3">
                          {/* <img
                            className="rounded-full"
                            src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          /> */}
                          <Image
                            className="rounded-full h-full w-full"
                            src="/products/e-p1.png"
                            alt="Alex Shatov"
                            width={40}
                            height={40}
                            sizes="20vh"
                          />
                        </div>
                        <div className="font-medium truncate text-gray-800">
                          Minimalistic shop for multipurpose use
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="">$720.00</p>
                    </td>
                    <td className="">
                      <input
                        className="mx-3 border max-w-20 p-2 "
                        type="number"
                        onChange={(e) => console.log(e.target.value)}
                        value={1}
                      />
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <p className="">$720.00</p>
                    </td>
                  </tr>

                  <tr className=" border-b">
                    <td colSpan={1}></td>

                    <td colSpan={2} className="">
                      <p className="font-bold my-8">Total</p>
                    </td>
                    <td colSpan={1}>
                      <p className="font-bold my-8">$2160.00</p>
                    </td>
                  </tr>
                  <tr className=" border-b">
                    <td colSpan={2} className="text-end">
                      <p className="font-bold my-8 mr-3">Shipping cost</p>
                    </td>
                    <td colSpan={2} className="text-center ">
                      <div className="flex flex-col py-3 gap-2">
                        <div>
                          <label>Free shipping : $0</label>
                          <input
                            type="radio"
                            className="ml-3"
                            name="shipping"
                            value={"fastshipping"}
                          />
                        </div>
                        <div>
                          <label>Free shipping : $0</label>
                          <input
                            type="radio"
                            className="ml-3"
                            name="shipping"
                            value={"freeshipping"}
                          />
                        </div>

                        <div>
                          <label>Free shipping : $0</label>
                          <input
                            type="radio"
                            className="ml-3"
                            name="shipping"
                            value={"freeshipping"}
                          />
                        </div>

                        <div>
                          <label>Free shipping : $0</label>
                          <input
                            type="radio"
                            className="ml-3"
                            name="shipping"
                            value={"freeshipping"}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <button className="border p-2 hover:font-semibold hover:border-orange-300 mt-6">
                        Update Cart
                      </button>
                    </td>
                    <td colSpan={1} className="my-8 flex gap-3">
                      <button className="bg-gradient-to-r from-orange-300 to-orange-600 text-white p-2 w-full mt-6">
                        Checkout
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
