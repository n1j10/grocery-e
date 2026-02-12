"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingBasket } from 'lucide-react'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Api from '../_utils/Api'
import { CartContext } from '../_context/cartContext'
const productDealts = ({ product }) => {

    const [productToaolPrice, setProductToaolPrice] = useState(
        product.sellingPrice ? product.sellingPrice : product.realPrice
    );

    const [quantity, setQuantity] = useState(1);
    const jwt = sessionStorage.getItem("jwt")
    const router = useRouter()

    const user = JSON.parse(sessionStorage.getItem("user"))

    const { updateCart, setUpdateCart } = useContext(CartContext)
    const AddToCart = () => {
        if (!jwt) {
            toast("Please login to add to cart")
            router.push("/sign-in")
            return
        }
        const data = {
            data: {
                products: product.id,
                quantity: quantity,
                amount: (productToaolPrice * quantity).toFixed(2),
                users_permissions_user: user.id,
                userId: user.id
            }

        }
        console.log(data)
        Api.addToCart(data, jwt).then((resp) => {
            toast("Product added to cart")
            setUpdateCart(!updateCart)
        }, (e) => {
            toast("Error adding product to cart")
        })

    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <Image className='w-full h-full object-cover'
                src={`https://grocery-n-strapi-production.up.railway.app${product?.image?.[0]?.url}`}
                width={150}
                height={150}
                unoptimized={true}
                //  style={{objectFit:'cover'}}
                alt={product?.name} />

            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>  {product?.name}</h2>
                <h2 className='text-sm text-gray-500'>  {product?.description}</h2>


                <div className='flex gap-2 items-center'>
                    <del className='text-sm text-red-400 '>${product?.realPrice}</del>
                    <h2 className='font-bold text-lg text-green-700'>${product?.sellingPrice}</h2>
                </div>
                <div className="flex flex-col items-baseline ">
                    <div className='flex gap-2 items-center'>
                        <div className='flex gap-2 items-center p-5 border'>
                            <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>-</Button>
                            <h1>{quantity}</h1>
                            <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                        </div>
                        <h2 className='font-bold text-lg text-gray-700'>${(productToaolPrice * quantity).toFixed(2)}</h2>
                    </div>




                    <Button onClick={() => AddToCart()} className="flex gap-3 mt-5">
                        <ShoppingBasket />
                        Add To Cart

                    </Button>

                </div>
                <h2><span className='font-bold text-[#e6b800]'>Category:</span> {product?.categories?.[0]?.name}</h2>



            </div>


        </div>
    )
}

export default productDealts