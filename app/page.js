import Image from "next/image";
import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import Api from "./_utils/Api";
import CategoryList from "./_components/catrgoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/footer";
export default async function Home() {

  const sliderList = await Api.getSlider();
  // console.log(sliderList);


  const categoryList = await Api.getCategoryList();
  // console.log("Categories:", categoryList);

  const productList = await Api.getProductList();
  console.log("ProductList:", productList);

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
