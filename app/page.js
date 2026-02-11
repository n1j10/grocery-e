import Image from "next/image";
import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import Api from "./_utils/Api";
import CategoryList from "./_components/catrgoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/footer";

export const dynamic = 'force-dynamic';
export default async function Home() {

  let sliderList = [];
  try {
    sliderList = await Api.getSlider();
  } catch (error) {
    console.error("Failed to fetch slider:", error);
  }

  let categoryList = [];
  try {
    categoryList = await Api.getCategoryList();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  let productList = [];
  try {
    productList = await Api.getProductList();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (

    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />

      <Image src="/footerImg.png"
        alt="icon"
        width={1000}
        height={200}
        layout="responsive"
        className="mt-10" />
      <Footer />

    </div>
  );
}
