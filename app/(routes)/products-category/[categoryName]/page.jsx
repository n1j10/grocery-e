import TopCategoryList from './_components/topCategoryList'
import Api from '@/app/_utils/Api'
import ProductList from '@/app/_components/ProductList'
const ProductCategory = async ({ params }) => {
    const { categoryName } = await params;
    const [productslist, categoryList] = await Promise.all([
        Api.getProductByCategory(categoryName),
        Api.getCategoryList()
    ]);


    return (
        <div >
            <h2 className='bg-[#ffcc00] text-black font-bold p-4 text-center text-2xl capitalize'>
                {decodeURIComponent(categoryName)}
            </h2>
            <div className='p-5 md:p-10'>
                <TopCategoryList categoryList={categoryList} selectedCategory={categoryName} />
                <ProductList productList={productslist} />
            </div>
        </div>
    )
}

export default ProductCategory