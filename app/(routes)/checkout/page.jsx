"use client";
import { Input } from '@/components/ui/input'
import { ArrowBigRight, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Api from '@/app/_utils/Api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Checkout() {

    const [jwt, setJwt] = useState();
    const [userId, setUserId] = useState();

    const [totalCartItem, setTotalCartItem] = useState(0)
    const [cartItemsList, setCartItemsList] = useState([])
    const router = useRouter();
    const [subTotal, setSubTotal] = useState(0);


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');

    const allAmount = () => {
        const calculateallAmount = (subTotal * 0.9) + 15
        return calculateallAmount.toFixed(2)
    }

    const handlePayment = async () => {
        if (!username || !email || !phone || !zip || !address) {
            toast.error("Please fill in the billing address")
            return
        }

        const data = {
            data: {
                username: username,
                email: email,
                phone: phone,
                zip: zip,
                address: address,
                totalOrderAmount: Math.round(allAmount()),
                userId: userId.id,
                orderItemList: cartItemsList.map(item => ({
                    product: item.productId,
                    quantity: item.quantity,
                    price: item.amount,
                }))
            }
        }

        
        Api.createOrder(data, jwt).then((resp) => {
            console.log(resp)
            toast("Order created successfully")
            router.push("/")
        }, (e) => {
            console.error("Order creation error:", e);
            const errorMessage = e?.response?.data?.error?.message || "Error creating order";
            toast(errorMessage);
        })
    }







    useEffect(() => {
        let total = 0;
        if (Array.isArray(cartItemsList)) {
            cartItemsList.forEach(item => {
                total = total + item.amount
            });
        }
        setSubTotal(total);
    }, [cartItemsList]);





    useEffect(() => {
        if (typeof window !== 'undefined') {
            const jwt = sessionStorage.getItem("jwt");
            const user = JSON.parse(sessionStorage.getItem("user"));
            setJwt(jwt);
            setUserId(user);
        }
    }, [])

    useEffect(() => {
        if (userId && jwt) {
            getCartItems();
        }
    }, [userId, jwt])

    const getCartItems = async () => {
        const cartItem = await Api.getCartItems(userId.id, jwt)
        console.log("cartItem", cartItem)
        setTotalCartItem(cartItem?.length)
        setCartItemsList(cartItem)
    }


    return (
        <div>
            <h2 className='p-3 bg-[#ffcc00] text-xl font-bold text-center'>Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
                <div className='col-span-2 mx-20'>
                    <h2 className='font-bold text-3xl'>Billing Details</h2>
                    <div className='grid grid-cols-2 gap-10 mt-3'>
                        <Input placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='grid grid-cols-2 gap-10 mt-3'>
                        <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Input placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </div>

                    <div className='mt-3'>
                        <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>

                <div className='mx-10 border'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart({totalCartItem})</h2>

                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'>Subtotal: <span>{subTotal}</span></h2>
                        <hr />
                        <h2 className='flex justify-between'>Delivery: <span>15 $</span></h2>
                        <h2 className='flex justify-between'>Tax (9%): <span> {(subTotal * 0.09).toFixed(2)}</span></h2>
                        <hr />
                        <h2 className='font-bold flex justify-between'>Total <span>{allAmount()}</span></h2>
                        <Button onClick={handlePayment}>Payment <ArrowBigRight /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout