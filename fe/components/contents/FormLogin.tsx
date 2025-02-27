import Link from "next/link";
import React from "react";

export default function FormLogin() {
  return (
    <form className="mx-28">
      <h3 className="text-center my-8 text-2xl font-semibold">Login</h3>
      <div className="my-3 border-b p-2">
        <input
          type="email"
          id="email"
          className="outline-none py-1 bg-transparent"
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="my-3 border-b p-2">
        <input
          type="password"
          id="password"
          className="outline-none py-1 bg-transparent"
          placeholder="Enter your password"
        />
      </div>
      <div className="my-6">
        <input type="checkbox" id="remember" />
        <label className="ml-2" htmlFor="remember">
          Remember me
        </label>
      </div>
      <div className="">
        <button className="bg-gradient-to-r from-orange-300 to-orange-600 text-white p-2 w-full">
          Login
        </button>
      </div>
      <div className="text-center my-5 text-gray-500">
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
    </form>
  );
}
