

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const TopCategoryList = ({ categoryList, selectedCategory }) => {

    return (


        <div className='mt-10'>

     <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-center gap-10 mt-5 2xl:ml-35 lg:ml-20'>
                {
                    Array.isArray(categoryList) && categoryList.map((category, index) => (
                        <div key={index} className='flex flex-col items-center justify-center gap-3 p-4
                          group cursor-pointer hover:border-[#df7747] border transition-all duration-300 w-[120px] sm:w-[150px]'
                        >
                            <Link href={"/products-category/" + category.name} key={index}
                            className={`overflow-hidden p-1 shadow-sm group-hover:shadow-md transition-all 
                            ${selectedCategory==category.name?'bg-[#df7747] text-dark': 'bg-white'}`}>
                                <Image
                                    src={`https://grocery-n-strapi-production.up.railway.app${category?.icon?.[0]?.url}`}
                                    width={70}
                                    height={70}
                                    unoptimized={true}
                                    alt='icon'
                                    className='group-hover:scale-110 transition-all duration-300'
                                />
                            </Link>
                            <p className={`text-amber-600 font-bold capitalize text-sm sm:text-base text-center
                            ${selectedCategory==category.name?'text-black': 'text-amber-600'}`}>
                                
                                {category.name}</p>
                        </div>
                    ))

                }
            </div>


        </div>



    )
}

export default TopCategoryList