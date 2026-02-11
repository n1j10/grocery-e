import React from 'react'
import Image from 'next/image'
import Api from '../_utils/Api'
import Link from 'next/link'
function CategoryList({ categoryList }) {
    return (
        <div className='mt-10'>

            <h2 className='font-bold text-2xl text-amber-500 '>Shop By Category</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-center gap-10 mt-5 2xl:ml-35 lg:ml-20 '>
                {
                    Array.isArray(categoryList) && categoryList.map((category, index) => (
                        <div key={index} 
                        className='flex flex-col items-center justify-center gap-3 p-4
                          group cursor-pointer 
                           transition-all duration-300 w-[120px] sm:w-[150px] border-[#aa968c] border
                            hover:border-[#e65812] hover:border-2  '             
                        >
                            <Link href={"/products-category/" + category.name} className='overflow-hidden rounded-full bg-white p-2 shadow-sm group-hover:shadow-md transition-all'>
                                <Image
                                    src={`https://grocery-strapi-lhum.onrender.com${category?.icon?.[0]?.url}`}
                                    width={70}
                                    height={70}
                                    unoptimized={true}
                                    alt='icon'
                                    className='group-hover:scale-110 transition-all duration-300'
                                />
                            </Link>
                            <p className='text-amber-600 font-bold capitalize text-sm sm:text-base text-center'>{category.name}</p>
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default CategoryList