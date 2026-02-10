import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
function CartItemList({ cartItemsList }) {

    const [SubTotal, setSubTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        if (Array.isArray(cartItemsList)) {
            cartItemsList.forEach(item => {
                total = total + item.amount
            });
        }
        setSubTotal(total);
    }, [cartItemsList]);

    return (
        <div>
            <div>

                {Array.isArray(cartItemsList) && cartItemsList?.map((product, index) => (
                    <div className='flex justify-between items-center' key={index}>
                        <div className='flex items-center gap-4 mt-5'>
                            <Image
//  src={product?.image?.[0]?.url ?
//                     `http://127.0.0.1:1337${product?.image?.[0]?.url}` : '/placeholder.jpg'}
                                src={product?.image ? `http://127.0.0.1:1337${product?.image}` : '/placeholder.jpg'}

                                alt={product.name || 'product image'}
                                width={80}
                                height={80}
                                className='border p-2 object-contain'
                                unoptimized={true}
                            />
                            <div>
                                <h2 className='font-bold text-lg'>{product.name}</h2>
                                <h2 className='text-sm text-gray-500'>Quantity: {product.quantity}</h2>
                                <h2 className='text-sm text-gray-500'>Price: ${product.sellingPrice}</h2>
                            </div>
                        </div>
                        <Trash className='cursor-pointer hover:text-red-500' size={20} />

                    </div>
                ))}




            </div>

        <div className="mt-5 absolute w-[90%] bottom-5 flex flex-col">
            <h2 >
                SubTotal <span>{SubTotal.toFixed(2)}</span>
            </h2>
           <Link href="/checkout"> <Button className="mt-4">Checkout</Button></Link>
        </div>




        </div>
    )
}

export default CartItemList