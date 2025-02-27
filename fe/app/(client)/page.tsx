import HeaderNavigation from "@/components/common/HeaderNavigation";
import BannerHeader from "@/components/contents/BannerHeader";
import BreakContent from "@/components/contents/BreakContent";
import DealBanner from "@/components/contents/DealBanner";
import GridLayoutCatagory from "@/components/contents/GridLayoutCatagory";
import LatestProducts from "@/components/contents/LatestProducts";
import ListBrand from "@/components/ui/ListBrand";
import axiosClient from "@/libs/axios";

export async function getData() {
  try {
    const data = await axiosClient.get("/page/home");
    return data.data;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export default async function Home() {
  const data = await getData();
  const {
    categories,
    latestProducts,
    topProducts,
    dealing_products,
    listBrands,
  }: any = data;
  console.log(listBrands);
  return (
    <main className="md:flex md:flex-col bg-slate-50 text-black">
      <HeaderNavigation />
      <div className="min-h-full">
        <BannerHeader />
      </div>
      {/* ---- */}
      <div className="xl:px-24">
        <BreakContent />
        <GridLayoutCatagory categories={categories} />
      </div>
      <LatestProducts />

      <DealBanner yearEnd={2024} monthEnd={6} dayEnd={30} />

      {/* List brand */}
      <ListBrand list ={listBrands} />
    </main>
  );
}
