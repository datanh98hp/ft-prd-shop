import ContentProduct, {
  TabDescriptionProduct,
} from "@/components/contents/ContentProduct";
import DealOfTheWeek from "@/components/contents/DealOfTheWeek";
import SwiperProduct from "@/components/contents/SwiperProduct";
import axiosClient from "@/libs/axios";
interface ProductDetailProps {
  name?: string;
  slug?: string;
  price?: number;
  category?: string;
  variations?: [];
  promotion_category?: {};
  product_images?: [];
}
async function getDetailProduct(id_product: number) {
  try {
    const res = await axiosClient.get(`/product/${id_product}`);
    const data = res.data;
    return {
      name: data.name,
      slug: data.slug,
      price: data.original_price,
      description: data.description,
      items: data.items,
      category: data.category.category_name,
      variations: data.category.variations,
      promotion_category: data.category.promotion_category,
      product_images: data.product_images,
    
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export default async function Product({
  params: { id_product, slug },
}: {
  params: {
    id_product: string;
    slug: string;
  };
}) {
  const data = await getDetailProduct(Number(id_product));
  
  return (
    <div className="md:flex w-full flex-col items-center ">
      <div className="md:flex w-full mx-4 md:my-32 my-20 justify-center overflow-x-auto">
        <div className="md:max-w-[30rem] md:p-0">
          <SwiperProduct listImage={data.product_images} />
        </div>

        <div className="md:w-[35rem] ">
          <div className="md:p-12">
            <ContentProduct
              name={data.name}
              slug={data.slug}
              category={data.category}
              variations={data.variations}
              promotion_category={data.promotion_category}
              price={data.price || " Updating"}
              discount={data.promotion_category?.promotion?.discount_rate}
              status={data.items.length > 0 ? 1 : 0}
              rating={5}
              des={data.description}
            />
          </div>
        </div>
      </div>
      {/* <div>showing detail property</div> */}
      <div className="w-full flex md:mx-4 md:my-4">
        <TabDescriptionProduct description={data.description} />
      </div>
      <DealOfTheWeek />
    </div>
  );
}
