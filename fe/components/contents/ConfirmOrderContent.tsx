import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { IoReturnDownBackOutline } from "react-icons/io5";

export default function ConfirmOrderContent() {
  return (
    <section className="flex flex-col justify-center antialiased text-gray-600 p-5 my-12">
      <div className="">
        <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm  border-gray-200 p-2">
          <header className="px-5 py-4 border-gray-100 my-6">
            <h2 className="font-semibold font-md text-center text-green-400">
              Thank you. Your order has been received.
            </h2>
          </header>
          <div className="p-4">
            <div className="overflow-x-auto">
              <div className="table-auto md:flex w-full lg:flex gap-6">
                <div className="md:w-1/3 flex flex-col gap-3">
                  <p className="text-lg text-black font-semibold mb-4 border-b p-2">
                    Order Infor
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Order ID :</p>
                    <p className="text-sm text-gray-500">#60235</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Date :</p>
                    <p className="text-sm text-gray-500">{`${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()} `}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Total :</p>
                    <p className="text-sm text-gray-500">$ 1,000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Payment method :</p>
                    <p className="text-sm text-gray-500">MOMO</p>
                  </div>
                </div>
                <div className="md:w-1/3  mt-12 md:mt-0 flex flex-col gap-3">
                  <p className="text-lg text-black font-semibold mb-4 border-b p-2">
                    Billing Address
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Adress:</p>
                    <p className="text-sm text-gray-500">
                      {" "}
                      Quoc Tuan - An Lao - Hai Phong
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">City :</p>
                    <p className="text-sm text-gray-500"></p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">County :</p>
                    <p className="text-sm text-gray-500">Vietnam</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Postcode :</p>
                    <p className="text-sm text-gray-500">180000</p>
                  </div>
                </div>
                <div className="md:w-1/3  mt-12 md:mt-0 flex flex-col gap-3">
                  <p className="text-lg text-black font-semibold mb-4 border-b p-2">
                    Shipping Address
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Street :</p>
                    <p className="text-sm text-gray-500">
                      Quoc Tuan - An Lao - Hai Phong
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">City :</p>
                    <p className="text-sm text-gray-500">Hai Phong</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Country :</p>
                    <p className="text-sm text-gray-500">Vietnam</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Postcode :</p>
                    <p className="text-sm text-gray-500">180000</p>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="my-12 bg-slate-500 bg-opacity-15">
                <div className="w-full px-4">
                  <p className="text-lg text-black font-semibold mb-4 border-b border-gray-300 p-2">
                    Order Infor
                  </p>

                  <table className="w-full mt-4 ">
                    <thead className="text-md text-gray-400  ">
                      <tr className="text-start py-2">
                        <th className="text-start">Product</th>
                        <th className="text-center">Qty</th>
                        <th className="text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t ">
                        <td className="max-w-[5rem] py-4">
                          Pixelstore fresh Blackberry
                        </td>
                        <td className="text-center py-4">x 02</td>
                        <td className="text-center py-4">$720.00</td>
                      </tr>
                      <tr className="border-t ">
                        <td className="max-w-[5rem] py-4">
                          Pixelstore fresh Blackberry
                        </td>
                        <td className="text-center py-4">x 02</td>
                        <td className="text-center py-4">$720.00</td>
                      </tr>

                      <tr className="border-t font-semibold">
                        <td className="max-w-[5rem] py-4">SUBTOTAL</td>
                        <td className="text-center py-4"></td>
                        <td className="text-center py-4">$720.00</td>
                      </tr>
                      <tr className="border-t font-semibold">
                        <td className="max-w-[5rem] py-4">SHIPPING</td>
                        <td className="text-center py-4"></td>
                        <td className="text-center py-4">$20.00</td>
                      </tr>
                      <tr className="border-t font-semibold">
                        <td className="max-w-[5rem] py-4">TOTAL</td>
                        <td className="text-center py-4"></td>
                        <td className="text-center py-4">$720.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center my-2 flex justify-center underline text-orange-400">
            <Link href="/" className="flex justify-center items-center gap-2 ">
              <IoReturnDownBackOutline className="text-2xl mr-2"/>
              <span>Return Home pageReturn Home page</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
