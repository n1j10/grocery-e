"use client"

import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Api from '@/app/_utils/Api'
import { CircleUserIcon } from 'lucide-react'
import CartItemList from './CartItemList'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { CartContext } from '../_context/cartContext'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



const Header = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [userId, setUserId] = useState(null)
  const [jwt, setJwt] = useState(null)

  const [Category, setCategory] = useState([])
  const [totalCartItem, setTotalCartItem] = useState(0)
  const [cartItemsList, setCartItemsList] = useState([])
  const { updateCart, setUpdateCart } = useContext(CartContext)

  useEffect(() => {
    getCategoryList()

    const token = sessionStorage.getItem("jwt")
    const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null

    if (token) {
      setJwt(token)
      setIsLogin(true)
    }
    if (user) {
      setUserId(user)
    }
  }, [])

  useEffect(() => {
    if (userId && jwt) {
      getCartItems()
    }
  }, [updateCart, userId, jwt])

  const getCategoryList = () => {
    Api.getCategory().then((resp) => {
      setCategory(resp.data?.data);
    })
  }

  const onSignOut = () => {
    sessionStorage.clear()
    toast("Signed Out Successfully.")
    router.push("/sign-in")
  }

  const getCartItems = async () => {
    if (!userId || !jwt) return
    const cartItem = await Api.getCartItems(userId.id, jwt)
    console.log(cartItem)
    setTotalCartItem(cartItem?.length)
    setCartItemsList(cartItem)
    
  }





  return (
    <div className='  shadow-sm flex justify-between p-2'>
      <div className='flex gap-8 items-center '>
        <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
        />
        </Link>
        {/* Category */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className='cursor-pointer flex gap-2 items-center border rounded-full p-2 bg-slate-200'>
              <LayoutGrid className='h-5 w-5' /> Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Browse Category</DropdownMenuLabel>

              {
                Category.map((cat) => (
                  <Link href={'/products-category/' + cat.name} key={cat.id}>
                    <DropdownMenuItem className=" cursor-pointer flex gap-2 items-center">
                      {cat?.icon?.[0]?.url ? (
                        <Image
                          src={`https://grocery-n-strapi-production.up.railway.app${cat?.icon?.[0]?.url}`}
                          alt={cat.name}
                          width={20}
                          height={20}
                          unoptimized={true}
                          className='rounded-full'
                        />
                      )
                        : (
                          <div className="w-5 h-5 rounded-full bg-gray-300" />
                        )}
                      <p className="cursor-pointer text-lg hover:text-blue-500">{cat.name}</p>
                    </DropdownMenuItem>
                  </Link>
                ))
              }

            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='hidden md:flex gap-3 items-center border rounded-full p-2 bg-slate-200 '>
          <Search className='h-5 w-5' />
          <input type="text" placeholder='Search' className='outline-none' />
        </div>
      </div>
      <div className='flex gap-2 items-center'>



        {/* Cart */}
        <Sheet>
          <SheetTrigger asChild>
            <h2 className='flex gap-2 items-center cursor-pointer'>
              
              <ShoppingBag /> {totalCartItem}
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-[#ffcc00] font-bold text-black p-2 mt-5">My Cart</SheetTitle>
              <div className="mt-4">
                <CartItemList cartItemsList={cartItemsList} />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {/* Login */}
        {!isLogin ? <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
          :

          <DropdownMenu>
            {/* Profile Dropdown */}

            <DropdownMenuTrigger asChild>
              <Button variant="outline"><CircleUserIcon className='h-7 w-7 cursor-pointer' /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem >  <Link href="/myOrders">Orders</Link></DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>




    </div>
  )
}

export default Header










































