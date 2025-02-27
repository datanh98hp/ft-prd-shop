"use client";
import React from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosClient from "@/libs/axios";
import { usePathname } from "next/navigation";
type FormContactValues = {
  email: string;
  name: string;
  message: string;
};
const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().max(20).required(),
    message: yup.string().max(50).required(),
  })
  .required();

export default function FormContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const pathName = usePathname();
  const sendContact = async (data: any) => {
    const urlRedirect = `${location.protocol}//${location.host}${pathName}`;
    await axiosClient.post("/api/contact", { ...data, urlPath: urlRedirect });
    //  setResult(true);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit((data) => sendContact(data))}
      className="mt-4 md:min-w-full"
    >
      <p className="text-red-500">{errors.email?.message}</p>
      <div className="  border-[0.02rem] mb-2 ">
        <input
          type="email"
          className="p-2 outline-none w-full"
          {...register("email", { required: true })}
          placeholder="Enter your email"
        />
      </div>
      <p className="text-red-500">{errors.name?.message}</p>
      <div className="  border-[0.02rem] mb-2 ">
        <input
          className="p-2 outline-none w-full"
          {...register("name")}
          placeholder="Enter your name"
        />
      </div>
      <p className="text-red-500">{errors.message?.message}</p>
      <div className=" border-[0.02rem] mb-2 ">
        <textarea
          className="p-2 outline-none resize-none w-full"
          {...register("message")}
          placeholder="Enter your message"
          aria-disabled="true"
          rows={3}
        />
      </div>
      <button
        className="bg-orange-500 p-2 w-full mt-4 text-white"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
