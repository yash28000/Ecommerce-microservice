"use client";
import { useEffect, useState } from "react";
import { useAppSelecto } from "../../../redux/store";
import { useRouter } from "next/navigation";
import { fetchCart, fetchProduct, fetchProducts } from "@/utlis/product";
import { useQuery } from "react-query";
import { wordlimiter } from "@/utlis/helper";
import { BiLoaderAlt, BiTrashAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { SelectForm } from "./components/qty-selector";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
interface CartData {
  user_id: number;
  p_id: number;
  id: number;
  price: number;
  qty: number;
}
interface ProductData {
  id: number;
  brand: string;
  desc: string;
  category: string;
  name: string;
  price: number;
  stock: number;
}

export default function Cart() {
  const router = useRouter();
  const auth = useAppSelecto((state) => state.authReducer.value.isAuth);
  const user = useAppSelecto((state) => state.authReducer.value.user);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["user.id"],
    queryFn: () => fetchCart(user.id),
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
  });
  const total = () => {
    let sum = 0;
    data.map(async (item: CartData) => {
      let p_data = await fetchProduct(item.p_id);
      sum = sum + p_data.price;
    });
    console.log(sum);
    return sum;
  };

  const change = () => {
    refetch();
  };
  useEffect(() => {
    refetch();
  }, []);
  return auth && data ? (
    <div>
      <div className="w-full flex justify-between  px-10 mt-5 gap-3">
        <div className="h-full w-3/4 rounded-sm shadow-md">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          </div>
          <div className="my-2 px-2 flex flex-col">
            {data ? (
              data?.cart_data?.map((item: any, key: any) => (
                <>
                  <CartDetails key={key} params={item} change={change} />
                  <Separator />
                </>
              ))
            ) : isFetching ? (
              <span className="w-10 h-10 animate-spin">
                <BiLoaderAlt size={30} />
              </span>
            ) : (
              <p className="text-sm text-gray-400 font-extralight">
                No Itmes in Cart present
              </p>
            )}
          </div>
        </div>
        <div className="h-full py-4 gap-5 w-1/4 shadow-md px-2 rounded-md flex flex-col">
          <p className="text-xs text-green-600 font-extralight">
            Tour order is eligible for FREE Delivery
          </p>
          <p>
            Subtotal for ({data.cart_data.length} items) : Rs{data.total}
          </p>
          <Button className="w-full" variant="default">
            Proceed to Buy
          </Button>
        </div>
      </div>
      {/**/}
    </div>
  ) : (
    <>
      <div className="flex w-full h-full items-center justify-center text-xl font-semibold">
        LogIn first to Access cart.....
      </div>
    </>
  );
}

const CartDetails = ({
  params,
  change,
}: {
  params: CartData;
  change: () => void;
}) => {
  const [data, setData] = useState<ProductData[] | null>(null);
  const { toast } = useToast();
  const fetchData = async () => {
    const data = await fetchProducts({
      query: undefined,
    });
    const filterData = await data.filter(
      (item: any) => item.id === params.p_id
    );
    setData(filterData);
  };
  const handleChange = async (e: string) => {
    const newObj = {
      user_id: params.user_id,
      p_id: params.p_id,
      id: params.id,
      qty: Number(e),
      price: params.price,
    };
    const data_temp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}cart/cart?id=${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(newObj),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
    if (data_temp.success) {
      toast({
        title: "Changed",
        description: "Cart item quantity Changed SuccessFully",
      });
      change();
    }
  };
  const handleDelete = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}cart/cart?id=${params.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
    if (data.success) {
      toast({
        title: "Delete",
        description: "Cart item remove SuccessFully",
      });
    }
    change();
  };

  useEffect(() => {
    fetchData();
  }, [!data]);

  return data ? (
    <div className="flex items-center w-full gap-4 py-3 px-5 ">
      <img
        src={`${process.env.API_URL}image/img?id=${data[0]?.id}&name=${data[0]?.name}&type=product`}
        className="w-40 h-40 object-cover"
      />
      <div className="flex items-center w-full justify-between">
        <span className="flex flex-col items-start">
          <p className="text-left font-semibold text-xl my-1 ">
            {wordlimiter(data[0]?.name, 150)}
          </p>
          <span className="flex items-center justify-between w-full cursor-pointer my-4">
            <p className="text-sm font-extralight italic flex items-center gap-2 ">
              qty:{" "}
              <SelectForm cartDetails={params} handleChange={handleChange} />
            </p>
            <span className="flex items-center">
              <Button variant="ghost" onClick={handleDelete}>
                <BiTrashAlt size={30} />
              </Button>
            </span>
          </span>
        </span>
      </div>
    </div>
  ) : (
    <>
      <p className="text-sm text-gray-400 font-extralight">
        No Itmes in Cart present
      </p>
    </>
  );
};
