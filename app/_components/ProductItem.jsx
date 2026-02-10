import {useContext} from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductDealts from './productDealts'

const ProductItem = ({ product }) => {
    {/* another way to do it below with code below*/ }
    // Determine the image URL from Strapi response
    // const imageUrl = product?.image?.[0]?.url;
    // // Construct full URL
    // const fullImageUrl = imageUrl ? `http://127.0.0.1:1337${imageUrl}` : '/placeholder.png';



    return (
        <div className='p-3 flex flex-col items-center justify-center border rounded-lg hover:scale-105 transition-all cursor-pointer bg-white'>
            <Image
                src={product?.image?.[0]?.url ?
                    `http://127.0.0.1:1337${product?.image?.[0]?.url}` : '/placeholder.jpg'}
                width={150}
                height={150}
                alt={product?.name || 'product'}
                className='object-contain h-[120px] w-[120px]'
                unoptimized={true}
                style={{ objectFit: 'contain' }}
            />



            <div className='mt-2 flex flex-col items-center'>


                <h2 className='font-bold text-lg text-center'>{product?.name}</h2>


                <div className='flex gap-2 items-center'>
                    <h2 className='text-sm text-gray-400 line-through'>${product?.realPrice}</h2>
                    <h2 className='font-bold text-lg text-green-700'>${product?.sellingPrice}</h2>
                </div>



                <Dialog>
                    <DialogTrigger asChild>

                        <Button className='mt-2 border border-amber-500 text-white hover:bg-amber-500 hover:text-red-500 px-4 py-1.5 rounded-md text-sm transition-all font-medium'
                        >Add To Cart</Button>


                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="sr-only">{product?.name}</DialogTitle>
                            <DialogDescription className="sr-only">
                                {product?.description}
                            </DialogDescription>
                        </DialogHeader>
                        <ProductDealts product={product} />
                    </DialogContent>
                </Dialog>

            </div>














            {/* another way to do it below*/}


            {/* <div className='w-[150px] h-[150px] flex items-center justify-center rounded-lg bg-gray-50 overflow-hidden'>
                
                {imageUrl 
                
                ? (
                    <Image
                        src={fullImageUrl}
                        width={150}
                        height={150}
                        alt={product?.name || 'product'}
                        className='object-contain h-[120px] w-[120px]'
                        unoptimized={true}
                    />
                ) : (
                    <div className='text-xs text-gray-400'>No Image</div>
                )}
            </div>


            <div className='mt-2 flex flex-col items-center'>
                <h2 className='font-bold text-lg text-center'>{product?.name}</h2>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-sm text-gray-400 line-through'>${product?.realPrice}</h2>
                    <h2 className='font-bold text-lg text-green-700'>${product?.sellingPrice}</h2>

                </div>
                <button className='mt-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-4 py-1.5 rounded-md text-sm transition-all font-medium'>
                    Add To Cart
                </button>
            </div> */

            }


        </div>
    )
}

export default ProductItem