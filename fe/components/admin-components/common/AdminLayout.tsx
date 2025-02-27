"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiBell, BiMenuAltLeft, BiMenuAltRight, BiMoon, BiSun } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiContactsBookLine, RiProductHuntLine } from "react-icons/ri";
import { VscDashboard } from "react-icons/vsc";
import DropdownMenu from "./DropdownMenu";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { BsMoon, BsSun } from "react-icons/bs";

export default function AdminLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpenMobile, setOpenMobile] = useState(false);
    const { theme, setTheme } = useTheme();
    const changeMode = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };
    return (
        <>
            <div className="flex w-full relative">
                {/* sidebar */}
                {
                    isOpenMobile && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ ease: "easeIn", duration: 0.3 }}
                            className="h-svh overflow-auto shadow-xl dark:bg-[#191C24] bg-slate-100 dark:text-gray-300 md:w-[16rem] w-[15rem] scroll-smooth md:scroll-auto z-10 md:relative absolute top-0 left-0">
                            <ul className="flex flex-col text-sm">
                                <li className="flex items-center gap-1  px-3 py-1 rounded-xl  my-4">
                                    <div className="flex items-center md:justify-center justify-between w-full gap-2">
                                        <Image
                                            src="/imgs/logo.jpg"
                                            alt="logo"
                                            width={45}
                                            height={45}
                                            priority={true}
                                            className="rounded-full"
                                        />

                                        <button
                                            className="md:hidden"
                                            onClick={() => setOpenMobile(!isOpenMobile)}>
                                            <BiMenuAltLeft size={20} />
                                        </button>
                                    </div>
                                </li>
                                <li className="flex items-center w-full gap-1 hover:bg-slate-200 px-3 py-1 rounded-xl dark:hover:bg-opacity-20">
                                    <span className="rounded-full p-2">
                                        <VscDashboard size={20} />
                                    </span>
                                    <Link href={"/dashboard"} className="hover:text-[#e4a554]">Dashboard</Link>
                                </li>

                                <li className="flex items-center gap-1 px-3 hover:bg-slate-200  py-1 rounded-xl dark:hover:bg-opacity-20">
                                    <DropdownMenu icon={(
                                        <span className="rounded-full  p-2">
                                            <IoSettings size={20} />
                                        </span>
                                    )} tile="Products   " list={[
                                        { name: "Product info", href: "/admin/products" },
                                        { name: "Product category", href: "/admin/category" },
                                        { name: "Product Dealing", href: "/admin/dealing" },
                                    ]} absolute={false} />
                                </li>
                                <li className="flex items-center gap-1 px-3 hover:bg-slate-200  py-1 rounded-xl dark:hover:bg-opacity-20">
                                    <DropdownMenu icon={(
                                        <span className="rounded-full  p-2">
                                            <IoSettings size={20} />
                                        </span>
                                    )} tile="Promotion" list={[
                                        { name: "Promotion", href: "/admin/promotion" },
                                        { name: "Promotion category", href: "/admin/promotion-category" },

                                    ]} absolute={false} />
                                </li>
                                <li className="flex items-center gap-1 px-3 hover:bg-slate-200  py-1 rounded-xl  dark:hover:bg-opacity-20">
                                    <span className="rounded-full  p-2">
                                        <MdOutlineCategory size={20} />
                                    </span>
                                    <Link href={"/admin/users"} className="hover:text-[#e4a554]">Users</Link>
                                </li>
                                <li className="flex items-center gap-1 px-3 hover:bg-slate-200  py-1 rounded-xl  dark:hover:bg-opacity-20">
                                    <span className="rounded-full   p-2">
                                        <MdOutlineCategory size={20} />
                                    </span>
                                    <Link href={"/admin/orders"} className="hover:text-[#e4a554]">Orders</Link>
                                </li>
                                <li className="flex items-center gap-1 px-3 hover:bg-slate-200  py-1 rounded-xl  dark:hover:bg-opacity-20">
                                    <span className="rounded-full   p-2">
                                        <RiContactsBookLine size={20} />
                                    </span>

                                    <Link href={"/admin/contact"} className="hover:text-[#e4a554]">Contact</Link>
                                </li>
                                <li className="flex items-center gap-1 px-3 hover:bg-slate-200  py-1 rounded-xl dark:hover:bg-opacity-20">
                                    <DropdownMenu icon={(
                                        <span className="rounded-full   p-2">
                                            <IoSettings size={20} />
                                        </span>
                                    )} tile="Setting" list={[
                                        { name: "Information", href: "/admin/info" },
                                        { name: "SEO", href: "/admin/seo" },
                                    ]} absolute={false} />
                                </li>
                            </ul>

                        </motion.div>
                    )
                }
                <div className="w-full">
                    {/* Header */}
                    <div className="flex justify-between w-full h-16 bg-slate-100 dark:bg-[#191C24]">
                        {/* logo */}
                        <div className="flex items-center gap-3 mx-16">
                            {
                                !isOpenMobile && (
                                    <div>
                                        <Image
                                            src="/imgs/logo.jpg"
                                            alt="logo"
                                            width={45}
                                            height={45}
                                            priority={true}
                                            className="rounded-full"
                                        />
                                    </div>
                                )
                            }
                            <button onClick={() => setOpenMobile(!isOpenMobile)}>
                                <BiMenuAltRight size={25} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3  mx-16">
                            <div>
                                <BiBell size={25} />
                            </div>
                            <button onClick={() => changeMode()}>
                                {
                                    theme === "light" ? <BsMoon size={25} /> : <BsSun size={25} />
                                }
                            </button>
                            <div>Account</div>
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>

        </>
    );
}
