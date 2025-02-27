"use client";
import { useFilterStore } from "@/store/filter-product.store";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
export default function DropdownMenu({
    icon,
    list,
    tile,
    absolute,
}: {
    icon?: JSX.Element;
    list?: Array<any>;
    tile: string;
    absolute: boolean;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const { state, setStateFilter } = useFilterStore();
    const { page, items_per_page, sortBy, product_cate_id } = state;
    const route = useRouter();
    const handleClick = () => {
        setIsOpen((prev) => !prev);

    };
    return (
        <div className="w-full ">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={clsx(
                    absolute ? "relative" : "",
                    isOpen ? "ext-orange-500" : "",
                    "flex justify-between items-center text-lg active:text-white duration-300 w-full"
                )}
            >   <div className="flex items-center text-sm gap-2 hover:text-[#e4a554]">
                    {icon}
                    <span className="mr-2">{tile}</span>
                </div>
               
                <span>
                    {isOpen ? (
                        <FaAngleDown size={20} width={5} />
                    ) : (
                        <FaAngleUp size={20} />
                    )}
                </span>
            </button>

            {isOpen && (
                <div
                    className={clsx(
                        absolute ? "absolute top-0 left-0  text-sm" : ""
                    )}
                >
                    {list?.map((item, i) => (
                        <li className="mx-[20px] hover:text-[#ffba00] my-[15px]" key={i}>

                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </div>
            )}
        </div>
    );
}
