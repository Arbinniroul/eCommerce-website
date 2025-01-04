import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import userCartItemsContent from './cart-items-content'

export default function UserCartWrapper({cartItems}) {
  return (
    <SheetContent className="sm:max-w-md ">
        <SheetHeader>
        <SheetTitle>
Your Cart
        </SheetTitle>   
        </SheetHeader>
        <div className='mt-8 space-y-4'>
  { 
    cartItems && cartItems.length > 0 
      ? cartItems.map(item => <userCartItemsContent key={item.productId} cartItem={item} />) 
      : null
  }
</div>

     <div className='mt-8 space-y-4'>
   <div className='flex justify-between '>
    <span className='font-bold'>Total</span>
    <span className='font-bold'>
        $1000
    </span>
   </div>
     </div>
     <Button className='w-full mt-6'>Checkout</Button>
    </SheetContent>
  )
}
