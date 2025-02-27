import Link from "next/link";
import React from "react";

export default function FormRegister() {
  return (
    <form className="mx-28">
      <h3 className="text-center my-8 text-2xl font-semibold">Register</h3>
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
          type="text"
          id="email"
          className="outline-none py-1 bg-transparent"
          required
          placeholder="Enter your usermame"
        />
      </div>
      <div className="my-3 border-b p-2">
        <select className="bg-transparent">
          <option value="84">{`(+84)`}</option>
          <option value="85">{`(+85)`}</option>
          <option value="86">{`(+86)`}</option>
          <option value="87">+{`(+87)`}</option>
        </select>
        <input
          type="text"
          id="text"
          pattern="/(84|0[3|5|7|8|9])+([0-9]{8})\b/g"
          className="outline-none py-1 bg-transparent ml-2"
          required
          placeholder="Enter your phone"
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
      <div className="my-3 border-b p-2">
        <input
          type="password"
          id="password"
          className="outline-none py-1 bg-transparent"
          placeholder="Enter re-password"
        />
      </div>
      <div className="my-6">
        <input type="checkbox" id="remember" />
        <label className="ml-2" htmlFor="remember">Remember me</label>
      </div>
      <div className="">
        <button className="bg-gradient-to-r from-orange-300 to-orange-600 text-white p-2 w-full">
          Register now
        </button>
      </div>
    </form>
  );
}
