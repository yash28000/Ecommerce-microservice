"use client";
import { fetchProduct, fetchProducts } from "@/utlis/product";
import { useEffect } from "react";
import { useQuery } from "react-query";
type PageProps = {
  params: {
    slug: number;
  };
};

export default function PageSlug({ params: { slug } }: PageProps) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["slug"],
    queryFn: () => fetchProduct(slug),
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
  });
  useEffect(() => {
    refetch();
  }, []);
  console.log(data);
  return data ? (
    <>
      <h1 className="px-10 my-10 text-2xl font-semibold capitalize">
        {data.name}
      </h1>
      <div className="grid grid-cols-2 items-center justify-center px-20 gap-10 w-full h-full">
        <div className="flex items-center justify-center">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}image/img?id=${data.id}&name=${data.name}&type=product`}
            className="w-[300px] rounded-md h-[400px] object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-center">
          <h1 className="text-4xl font-semibold capitalize my-2">
            {data.name}
          </h1>
          <span className="flex items-center gap-2">
            <p className="text-xl font-extralight">Rs.{data.price}</p>
            <p className="text-xl font-extralight line-through text-red-500">
              Rs.{Number(data.price) + 100}
            </p>
          </span>
          <p className="italic my-2 text-md">
            deleiver within 7 days of order.
          </p>
          <span className="flex items-center gap-5 my-2">
            <button className="px-5 py-4 text-md font-semibold outline outline-1 outline-gray-300 rounded-md">
              Buy Now
            </button>
            <button className="px-5 py-4 text-md font-semibold outline outline-1 outline-gray-300 rounded-md">
              Add to Cart
            </button>
          </span>
        </div>
      </div>
      <hr className="w-full h-[1px] bg-gray-400 my-6" />
      <div className="w-full">
        <h1 className="px-10 font-bold text-2xl">Description</h1>
        <p className="px-10 my-2 text-xl italic">{data.desc}</p>
      </div>
    </>
  ) : (
    <></>
  );
}
