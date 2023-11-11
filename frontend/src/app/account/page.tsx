"use client"
import { useSearchParams } from "next/navigation"
import { useAppSelecto } from "../../../redux/store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {AiOutlineInbox,AiFillLock,AiFillCustomerService,AiFillCreditCard,AiOutlineCodeSandbox} from 'react-icons/ai'
import DetailsForm from "./components/Details-form"
export default function UserPage() {
    const searchParams = useSearchParams()
    const user_id = searchParams.get('user')
    return (
        <>
            <h1 className="px-10 font-bold text-2xl mt-10">Your Account</h1>
            <div className="w-full h-full items-center flex-col px-10 justify-center flex">
                <div className="px-10 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-[1200px]">
                    <div className="outline outline-1 outline-gray-200 flex gap-5 items-center px-4 py-10 rounded-md cursour-pinter">
                        <AiOutlineInbox size={50}/>
                        <span className="flex flex-col items-start justify-center">
                            <h1 className="text-lg font-semibold">Your Orders</h1>
                            <p>Track, return, or buy things again</p>
                        </span>
                    </div>
                    <div className="outline outline-1 outline-gray-200 flex gap-5 items-center px-4 py-10 rounded-md cursor-pointer">
                        <AiFillLock size={50}/>
                        <span className="flex flex-col items-start justify-center">
                            <h1 className="text-lg font-semibold">Login & Security</h1>
                            <p>Edit login, name, and mobile number</p>
                        </span>
                    </div>
                    <div className="outline outline-1 outline-gray-200 flex gap-5 items-center px-4 py-10 rounded-md cursor-pointer">
                        <AiOutlineCodeSandbox size={50}/>
                        <span className="flex flex-col items-start justify-center">
                            <h1 className="text-lg font-semibold">Prime</h1>
                            <p>View benefilts and payment settings</p>
                        </span>
                    </div>
                    <div className="outline outline-1 outline-gray-200 flex gap-5 items-center px-4 py-10 rounded-md cursor-pointer">
                        <AiFillCreditCard size={50}/>
                        <span className="flex flex-col items-start justify-center">
                            <h1 className="text-lg font-semibold">Payment Options</h1>
                            <p>Edit or add payment methods</p>
                        </span>
                    </div>
                    <div className="outline outline-1 outline-gray-200 flex gap-5 items-center px-4 py-10 rounded-md cursor-pointer">
                        <AiFillCustomerService size={50}/>
                        <span className="flex flex-col items-start justify-center">
                            <h1 className="text-lg font-semibold">Contact Us</h1>
                            <p>For any help and complaint contact our 24X7 customer service</p>
                        </span>
                    </div>
                </div>
                <hr className="w-full h-[1px] bg-gray-200 my-10"/>
            </div>
               

        </>
    )
}