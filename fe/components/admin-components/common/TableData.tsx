"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiMenuAltRight, BiSort } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'

export default function TableData({
    data,
    filter,
}: {
    data: Array<any>,
    filter?: {}
}) {
    const [name, setName] = React.useState('')
    return (
        <div className='p-2 md:mx-4'>
            <div className='my-6 p-3'>
                <form action="" className='w-full flex items-center md:justify-start justify-between  gap-4'>
                    <div className="items-center">
                        <label className="text-white min-w-fit">Name</label>
                        <input
                            type="text"
                            name="keyword"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Search by name"
                            className=" p-2 mt-3 w-full outline-none text-gray-500"
                        />
                    </div>
                    <div className="flex flex-col justify-center ">
                        <label className="text-white min-w-fit">Price</label>
                        <select className='p-[9px] mt-3'>
                            <option value="asc" className=''>Low to High</option>
                            <option value="desc" className=''>High to Low</option>
                        </select>
                    </div>
                    <div className="flex  flex-col justify-center">
                        <label className="text-white min-w-fit">Category</label>
                        <select className='p-[9px] mt-3'>
                            <option value="1" className=''>Category Item</option>
                            <option value="2" className=''>Category Item</option>
                        </select>
                    </div>

                </form>
            </div>
            <div className=' overflow-auto w-full'>
                <table className="w-full ">
                    <thead className='bg-slate-500 h-16'>
                        <tr className=''>
                            <th className='w-1 text-center'>#</th>
                            <th className='md:w-24 w-20 border'>
                                <div className='flex items-center justify-center gap-3'>
                                    <span>Name</span>
                                    <button className=''>
                                        <BiSort />
                                    </button>
                                </div>
                            </th>
                            <th className='md:w-12 w-8 text-center'>
                                <div className='flex items-center justify-center gap-3' >
                                    <span>qty</span>
                                    <button className=''>
                                        <BiSort />
                                    </button>
                                </div>
                            </th>

                            <th className='md:w-12 text-center'>
                                <BiMenuAltRight />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b-[0.05rem] border-b-gray-300'>
                            <td>1</td>
                            <td className='md:w-fit w-fit flex items-center gap-3'>
                                <div className="w-40 h-40 md:p-2 p-1">
                                    <Image
                                        className="rounded-full h-full w-full"
                                        src="/products/e-p1.png"
                                        alt="Alex Shatov"
                                        width={40}
                                        height={40}
                                        sizes="40vh"
                                    />
                                </div>
                                <div className='text-left'>
                                    <div className='md:ml-4 ml-0'>
                                        <Link href="/admin/products/1" className='uppercase md:max-w-96 max-w-44 truncate font-semibold'>
                                            ádioasdjoijd adsasddafasf
                                            adasjasojaj ạ asdwd fasfdaisf afj[akdp[askakd [p]
                                        </Link>
                                        <p className='mt-2 '>700$</p>
                                        <p className='mt-2 text-sm text-gray-500'>#category_name</p>
                                        <span>Brand</span>
                                    </div>

                                </div>
                            </td>

                            <td className='text-center'>10</td>

                            <td className='text-center'>
                                <button>
                                    <BsTrash />
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}
