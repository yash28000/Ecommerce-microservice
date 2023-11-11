"use client"
import CardContainer from "./components/cardContainer";

export default function Products(){
    return(
        <>
        <div className="w-full h-full">
                <h1 className="text-3xl font-bold my-5 px-3 md:px-10">
                    Products
                </h1>
                <div className="px-3 py-2 w-full h-full justify-center items-center">
                    <CardContainer params={{
                        query: undefined
                    }}/>
                </div>
        </div>
        </>
    )
}