import { BiTrashAlt,BiLoaderAlt } from 'react-icons/bi'
import { useAppSelecto } from '../../../../redux/store'
import { fetchCart, fetchProducts } from '@/utlis/product'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useQuery } from 'react-query'
import { wordlimiter } from '@/utlis/helper'
interface CartData {
    user_id: number,
    p_id: number,
    id: number
}
export default function CartItems() {
    const u_id = useAppSelecto((state) => state.authReducer.value.user.id)
    
    const { toast } = useToast()
    
    const { data, isFetching, refetch } = useQuery({
        queryKey:['u_id'],
        queryFn: () => fetchCart(u_id),
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 10
    })
   useEffect(()=>{
    refetch()
   },[refetch])
    const handleDelete = async (id: number) => {
        const data = await fetch(`http://localhost:8080/cart/cart?id=${id}`, {
            method: 'DELETE'
        }).then((res) => {
            return res.json()
        }).then((data) => {
            return data
        })
        if (data.success) {
            toast({
                title: 'Delete',
                description: "Cart item remove SuccessFully"
            })
        }
        refetch()
    }
    return (
        <>
            <div className="flex w-full flex-col my-5">
                <div className='flex flex-col max-h-[200px] overflow-y-auto'>


                    {/* items for the cart */}
                    {data ? data?.cart_data?.map((item: any, key: any) => (
                        <Cart_item key={key} params={item} handleDelete={handleDelete} />
                    )) : isFetching ?(
                        <span className='w-10 h-10 animate-spin'>
                            <BiLoaderAlt size={30}/>
                        </span>
                    ):(
                        <p className='text-sm text-gray-400 font-extralight'>No Itmes in Cart present</p>
                    )}
                </div>
                {/* Until here */}
                <hr className='w-full h-[1px] mt-4 bg-black' />
                <span className='w-full'>
                    <button className='py-3 px-5 bg-black w-full text-white capitalize rounded-sm'>
                        checkout
                    </button>
                </span>
            </div>
        </>
    )
}
interface ProductData {
    id: number,
    brand: string,
    desc: string,
    category: string,
    name: string,
    price: number,
    stock: number

}
const Cart_item = ({ params, handleDelete }: { params: CartData, handleDelete: (id: number) => void }) => {
    const { toast } = useToast()
    const [data, setData] = useState<ProductData[] | null>(null)
    const fetchData = async () => {
        const data = await fetchProducts({
            query: undefined
        })
        const filterData = await data.filter((item: any) => item.id === params.p_id)
        setData(filterData)
    }
    useEffect(() => {
        fetchData()
    }, [!data])

    return data ? (
        <div className="flex items-center w-full gap-4 ">
            <img src={`http://localhost:8080/image/img?id=${data[0]?.id}&name=${data[0]?.name}&type=product`} className="w-18 h-16 object-cover" />
            <div className="flex items-center w-full justify-between">
                <span className="flex flex-col items-start">
                    <p className='text-left'>{wordlimiter(data[0]?.name,30)}</p>
                    <p className="text-sm font-extralight italic">qty: 2</p>
                </span>
                <button onClick={() => handleDelete(params.id)}>
                    <BiTrashAlt size={25} className="text-red-500" />
                </button>

            </div>
        </div>
    ) : (
        <>
        <p className='text-sm text-gray-400 font-extralight'>No Itmes in Cart present</p>
        </>
    )
}