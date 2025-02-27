
import Link from 'next/link';
import React from 'react'
import { CiFacebook } from 'react-icons/ci';
import { FaTiktok } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import EmailInputFooter from '@/components/ui/EmailInputFooter';

export default function Footer() {
  return (
    <div className="footer  w-screen bottom-0 h-fit bg-[#222222] text-black">
      <div className="md:p-24 p-3 pt-20 md:flex gap-4">
        <div className="md:w-2/6 md:my-0 my-4">
          <p className="text-white font-bold md:py-6 py-4">About Us</p>
          <p className="text-gray-500 md:py-6 py-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore dolore magna aliqua.
          </p>
        </div>
        <div className="md:w-2/6 ">
          <p className="text-white font-bold md:py-6 py-4">Newsletter</p>
          <p className="text-gray-500">
            Update new product information from your email
          </p>
          <EmailInputFooter />
        </div>
        <div className="md:w-1/6">
          <div className="p-2">
            <p className="text-white font-bold md:py-6 py-4">Menu</p>
            <ul className="text-gray-500">
              <li className="cursor-pointer ">
                <Link href="/">Home</Link>
              </li>
              <li className="cursor-pointer mt-3">
                <Link href="/product">Prduct</Link>
              </li>
              <li className="cursor-pointer mt-3">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="cursor-pointer mt-3">
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:w-1/6">
          <div className="p-2">
            <p className="text-white font-bold md:py-6 py-4">Follow Us</p>
            <p className="text-gray-500">Let us be social</p>
            <div className="flex  flex-row gap-4 my-3">
              <CiFacebook size={25} color="white" />
              <FaTiktok size={25} color="white" />
              <FiLink size={25} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
