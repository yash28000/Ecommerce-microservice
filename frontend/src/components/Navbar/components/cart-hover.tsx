import { CalendarIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import React from "react"
import CartItems from "./cart-items"
import { useAppSelecto } from "../../../../redux/store"

export function CartHover({children}:{children:React.ReactNode}) {
    const login = useAppSelecto((state)=>state.authReducer.value.isAuth)
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold text-xl  text-left">Cart</h2>
          <p className="text-sm font-extralight italic text-left ">items you added to cart.</p>
          <div className="space-y-1">
            {login?(
                <>
                <CartItems/>
                </>
            ):(
                <p className="my-5">Login first to show your cart itmes.</p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
