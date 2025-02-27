import BannerCommon from "@/components/common/BannerCommon";
import FormLogin from "@/components/contents/FormLogin";
import FormRegister from "@/components/contents/FormRegister";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <div className="">
      <BannerCommon title="Register" />
      <div className="h-full bg-slate-50 w-screen">
        <div className=" md:mx-28 md:my-24 border">
          <div className="md:flex">
            <div className="md:w-1/2 h-[70vh] flex justify-center items-center bg-[url('/banners/exclusive.jpg')] bg-center bg-cover">
              <div className="max-w-[25rem] flex flex-col justify-center items-center">
                <h3 className="text-white text-2xl">New to our website?</h3>
                <p className="text-sm text-gray-200 text-center">
                  Have an account?
                </p>

                <Link
                  href="/register"
                  className="text-white bg-orange-500 px-4 py-2 mt-4"
                >
                  Login now
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <FormRegister />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
