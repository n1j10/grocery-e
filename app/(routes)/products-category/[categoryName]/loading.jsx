import React from 'react'

const Loading = () => {
    return (
        <div>
            {/* Title Skeleton */}
            <div className='bg-[#ffcc00] p-4 flex justify-center'>
                <div className='h-8 w-48 bg-white/20 rounded animate-pulse'></div>
            </div>

            <div className='p-5 md:p-10'>

                {/* TopCategoryList Skeleton - Mimicking the grid layout */}
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-center gap-10 mt-5 2xl:ml-35 lg:ml-20'>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className='flex flex-col items-center justify-center gap-3 p-4 w-[120px] sm:w-[150px]'>
                            <div className='w-[70px] h-[70px] bg-gray-200 rounded-full animate-pulse'></div>
                            <div className='w-24 h-4 bg-gray-200 rounded animate-pulse'></div>
                        </div>
                    ))}
                </div>

                {/* ProductList Skeleton */}
                <div className='mt-10'>
                    <div className='h-8 w-40 bg-gray-200 rounded animate-pulse mb-6'></div>
                    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className='h-[250px] w-full bg-gray-100 rounded-lg animate-pulse p-3 flex flex-col gap-3'>
                                <div className='h-[120px] bg-gray-200 rounded-md w-full'></div>
                                <div className='h-4 bg-gray-200 rounded w-3/4 mx-auto'></div>
                                <div className='flex justify-between mt-auto'>
                                    <div className='h-4 w-10 bg-gray-200 rounded'></div>
                                    <div className='h-4 w-10 bg-gray-200 rounded'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
