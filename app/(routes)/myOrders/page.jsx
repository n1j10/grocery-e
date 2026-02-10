"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Api from '@/app/_utils/Api'

import MyOrderList from './MyOrderList'

function myOrders() {
    const [userId, setUserId] = useState(null)
    const [jwt, setJwt] = useState(null)
    const [orderList, setOrderList] = useState([])
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const jwt = sessionStorage.getItem("jwt");
            const user = JSON.parse(sessionStorage.getItem("user"));
            setJwt(jwt);
            setUserId(user);
        }
    }, [])

    const getMyOrders = async () => {
        const orderList = await Api.myOrders(userId.id, jwt)
        setOrderList(orderList)
        console.log(orderList)
    }

    useEffect(() => {
        if (!jwt) {
            // router.push('/')
        }
        if (userId && jwt) {
            getMyOrders()
        }
    }, [userId, jwt])

    return (
        <div className='p-5'>
        <h2 className='bg-[#ffcc00] text-xl font-bold text-center p-3'>my Orders</h2>
            <div>
                <h2 className=' font-bold text-3xl'>Order History</h2>

                {orderList.map((order, index) => (
                    <Collapsible key={index}>
                        <CollapsibleTrigger>
                        <div className='mt-5 border p-2 bg-slate-100 flex flex-evenly gap-20'>
                            <h2><span className='font-bold mt-3'> Order Date:</span> {order?.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</h2>
                            <h2><span className='font-bold mt-3'>Total Amount :</span>{order?.totalAmount}</h2>
                            <h2>    <span className='font-bold mt-3'>Status :</span> PENDING</h2>
                        </div>
                        
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                        
                          { order.orderItemList.map((item,index) => (
                            <MyOrderList key={index} orderItem={item} />
                           ))}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    )
}

export default myOrders