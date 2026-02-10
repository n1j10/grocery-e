import Image from 'next/image';
import React from 'react';


const MyOrderList = ({ orderItem }) => {
    const product = orderItem?.product;
    const imageUrl = product?.image?.[0]?.url;
    return (
    <div className='grid grid-cols-5 w-[60%] mt-5'>
            <Image
                src={
                    imageUrl
                        ? `http://127.0.0.1:1337${imageUrl}`
                        : '/placeholder.jpg'
                }
                alt={product?.name || 'Product image'}
                width={40}
                height={40}
                unoptimized={true}
              
            />
 <div className='col-span-2'>
            <h2 className='font-bold mb-3 mt-3'> name: <span className='text-slate-400 '>{orderItem?.product?.name}</span> </h2>
            <h2 className='font-bold mb-3  mt-3'> Selling Price: <span className='text-slate-400'>{orderItem?.product?.sellingPrice}</span> </h2>
        </div>

        <div className='col-span-2'>
            <h2 className='font-bold mb-3  mt-3'> quantity: <span className='text-slate-400'>{orderItem?.quantity}</span> </h2>
            <h2 className='font-bold mb-3  mt-3'> Amount: <span className='text-slate-400'>{orderItem?.product?.amount}</span> </h2>
        </div>

        </div>
        
    );
};

export default MyOrderList;
