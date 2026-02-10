import React from 'react'
import ProductItem from './ProductItem'
import {useContext} from 'react'

const ProductList = ({ productList }) => {
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl text-amber-500'>Popular Products</h2>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6'>
                {
                    Array.isArray(productList) && productList.map((product, index) => index<8 && (
                        <ProductItem key={index} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList