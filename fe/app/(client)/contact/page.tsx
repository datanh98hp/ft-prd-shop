
import BannerCommon from "@/components/common/BannerCommon";
import FormContact from "@/components/contents/FormContact";
import axiosClient from "@/libs/axios";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaTiktok } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";

// 

export async function getAbout(): Promise<any> {
  try {
    const res = await axiosClient.get("/about");

    const data = res.data;
    return data;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export default async function Contact() {
  const data = await getAbout();

  const address = data.address;
  const city = address.split(",")[2].trim();

  return (
    <div className="">
      <BannerCommon title="Contact Us" />
      <div className="md:flex flex-col justify-center items-center md:px-[12vw] mt-16">
        <div className="w-full md:flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29837.708104474477!2d106.52188164591124!3d20.80287496544327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a77d378526cad%3A0x8bcacb55d47f4b7a!2zUXXhu5FjIFR14bqlbiwgQW4gTMOjbywgSGFpIFBob25nLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1714810343637!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="w-full md:py-8 md:flex flex-wrap gap-2 p-4 md:justify-between ">
          <div className="gap-6 md:p-0">
            <div className="flex flex-row gap-6 items-center p-2 my-4">
              <IoHome size={30} color="orange" />
              <div>
                <p className="font-semibold">{`${address
                  .split(",")[0]
                  .trim()} ${address.split(",")[1].trim()}`}</p>
                <p>{city}</p>
              </div>
            </div>

            <div className="flex flex-row gap-6 items-center md:p-2 my-4">
              <LuPhoneCall size={30} color="orange" />
              <div>
                <p className="font-semibold">{data.phone}</p>
                <p className="">Zalo / Skype</p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center md:p-2 p-2 my-4 ">
              <CiMail size={30} color="orange" />
              <div>
                <p className="font-semibold">{data.email}</p>
                <p className="">sub:datanh98hp@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/5">
            <FormContact />
          </div>
          <div className="md:w-fit text-center justify-self-center">
            <div className="social my-4">
              <p className="text-black font-bold">Follow Us</p>
              <div className="flex flex-row gap-4 items-center justify-center mt-2">
                <Link href={data.fb ? data.fb : "#"}>
                  <FaFacebook size={30} className="hover:text-blue-600" />
                </Link>
                <Link href={data.tiktok ? data.tiktok : "#"}>
                  <FaTiktok size={30} className="hover:text-gray-600" />
                </Link>
                <Link
                  href={
                    data.instagram
                      ? "https://www.facebook.com/datdodev43/"
                      : "#"
                  }
                >
                  <BsInstagram size={30} className="hover:text-red-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
