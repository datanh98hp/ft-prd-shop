import BannerCommon from "@/components/common/BannerCommon";
import FormLogin from "@/components/contents/FormLogin";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="">
      <BannerCommon title="Login" />
      <div className="h-full bg-slate-50 w-screen">
        <div className=" md:mx-28 md:my-24 border">
          <div className="md:flex">
            <div className="md:w-1/2 h-[70vh] flex justify-center items-center bg-[url('/banners/exclusive.jpg')] bg-center bg-cover">
              <div className="max-w-[25rem] flex flex-col justify-center items-center">
                <h3 className="text-white text-2xl">New to our website?</h3>
                <p className="text-sm text-gray-200 text-center">
                  There are advances being made in science and technology
                  everyday, and a good example of this is the
                </p>

                <Link
                  href="/register"
                  className="text-white bg-orange-500 px-4 py-2 mt-4"
                >
                  Register now
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <FormLogin/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
