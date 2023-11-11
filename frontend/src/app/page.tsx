"use client"
import TabsContainer from '@/components/tabsContainer/tabs.container'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  return (
    <>
      <div className='flex flex-col justify-start px-4 md:px-10 mt-2'>
        <div className='w-full h-[250px] justify-center items-center flex relative mb-10'>
          
          <span className='flex flex-col justify-center items-center backdrop-blur-sm w-full h-full'>
            <h1 className='text-4xl font-bold mt-5'>Welcome to store </h1>
            <p className='text-sm font-extralight mb-10'>Begin your hunt for new products</p>
          </span>
          <img src='https://media.istockphoto.com/id/1175676026/vector/hypermarket-store-food-appliances-clothes-toys-seamless-icons-background-pattern.webp?s=2048x2048&w=is&k=20&c=BnUByAq4tH_O2clnqcQ3UV_Rsg_WsLBpUqRES8gOfxs=' className='w-full -z-10 absolute h-full object-cover'/>

        </div>

        <TabsContainer />
      </div>
    </>
  )
}
