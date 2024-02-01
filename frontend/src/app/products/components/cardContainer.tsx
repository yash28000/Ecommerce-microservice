import { fetchProducts } from "@/utlis/product"
import Card from "./card"
import { useEffect, useState } from "react"
interface CardQuery{
    query?: string
}
export default function CardContainer({params}:{params:CardQuery}) {
    const[data,setData] = useState<any>([])
   const fetchData = async()=>{
    const data = await fetchProducts(params)
    console.log(data)
    setData(data)
   }
   useEffect(()=>{
    fetchData()
   },[!data])
    return (
        <div className="w-full my-2 h-full flex items-center justify-center">

           <div className="w-full flex gap-10 items-center justify-center">
            <div className="grid grid-cols-[auto-fit_minmax(300px,_1fr)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {data?.map((value : any,key : any)=>(
                    <Card key={key} params={value}/>
                ))}
                
            </div> 
            </div>
        </div>
    )
}