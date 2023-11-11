"use client"
import { useEffect } from "react"
import { useAppSelecto } from "../../../redux/store"
import { useRouter } from "next/navigation"

export default function Cart (){
    const router = useRouter()
    const auth = useAppSelecto((state)=>state.authReducer.value.isAuth)
    useEffect(()=>{
        if(!auth){
            setTimeout(() => {
                router.push('/')
            }, 2000);
            
        }
    },[auth])
    return auth?(
        <div>
            Cart
        </div>
    ):(
        <>
        <div className="flex w-full h-full items-center justify-center text-xl font-semibold">
            LogIn first to Access cart.....
        </div>
        </>
    )
}