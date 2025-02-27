"use client";
import Image from "next/image";
import React from "react";

export default function CheckoutContent() {
  return (
    <section className="flex flex-col justify-center antialiased text-gray-600 p-5 my-12">
      <div className="">
        <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm  border-gray-200 p-2">
          {/* <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">List item cart</h2>
          </header> */}
          <div className="p-4">
            <div className="overflow-x-auto">
              <div className="table-auto w-full lg:flex gap-6">
                <div className="md:w-3/5">
                  <p className="text-lg text-black font-semibold bg-gray-200 p-2">
                    Billing Details
                  </p>
                  <div className="border-t border-gray-200 mt-4 py-3 text-sm">
                    <form className=" flex flex-col gap-4">
                      <div className="w-full ">
                        <input
                          type="text"
                          className="border p-2 outline-none w-full"
                          placeholder="Enter your address 1 ..."
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            className="border p-2 outline-none w-full "
                            placeholder="Enter your phone number ..."
                          />
                          <select className="outline-none border">
                            <option className="p-4">Choose country</option>
                            <option className="p-4">Choose country</option>
                          </select>
                          <input
                            type="text"
                            className="border p-2 outline-none w-full"
                            placeholder="Enter your email ..."
                          />
                        </div>
                      </div>

                      <div className="w-full ">
                        <input
                          type="text"
                          className="border p-2 outline-none w-full"
                          placeholder="Enter your address 2 ..."
                        />
                      </div>
                      <div className="w-full ">
                        <input
                          type="text"
                          className="border p-2 outline-none w-full"
                          placeholder="ZIP/Postcode"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="md:w-2/5  mt-12 md:mt-0">
                  <p className="text-lg text-black font-semibold bg-gray-200 p-2">
                    Your Order
                  </p>
                  <div className="border-t border-gray-200 mt-4 py-3 ">
                    <div className="flex justify-between text-md font-semibold my-4 text-gray-400">
                      <p>Product</p>
                      <p>Total</p>
                    </div>

                    <div className="flex justify-between text-md mb-6 border-t p-2">
                      <p>Fresh Brocoli</p>
                      <p>x 02</p>
                      <p>$720.00</p>
                    </div>

                    <div className="flex justify-between text-md font-semibold  mb-6">
                      <p>Subtotal</p>
                      <p>$2160.00</p>
                    </div>
                    <div className="flex justify-between text-md font-semibold  mb-6">
                      <p>Shipping</p>
                      <p>Flast ship : 10$</p>
                    </div>
                    <div className="flex justify-between text-md font-semibold  mb-6">
                      <p>Total</p>
                      <p>$2160.00</p>
                    </div>
                  </div>
                  <div className="flex justify-evenly">
                    <div className="flex gap-3 justify-center items-center">
                      <input type="radio" name="method_payment" id="momo" />
                      <label htmlFor="momo">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                          width={30}
                          height={30}
                          alt="visa"
                        />
                      </label>
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                      <input type="radio" name="method_payment" />
                      <label>
                        <Image
                          src="https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg"
                          width={80}
                          height={80}
                          alt="visa"
                          className=""
                        />
                      </label>
                    </div>
                  </div>
                  <div className="w-full mt-6">
                    <button className=" w-full p-2 border hover:border-orange-400 text-black hover:text-orange-500">Payment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
