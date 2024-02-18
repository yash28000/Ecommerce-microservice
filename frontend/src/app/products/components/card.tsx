import Link from "next/link";
import { BiTaxi } from "react-icons/bi";
import { useAppSelecto } from "../../../../redux/store";
import { useToast } from "@/components/ui/use-toast";
import { wordlimiter } from "@/utlis/helper";
interface CardData {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
}
export default function Card({ params }: { params: CardData }) {
  const { toast } = useToast();
  const auth = useAppSelecto((state) => state.authReducer.value.isAuth);
  const u_id = useAppSelecto((state) => state.authReducer.value.user.id);
  const clickToCart = async () => {
    const objData = {
      user_id: u_id,
      p_id: params.id,
      qty: 1,
      price: params.price,
    };
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}cart/`, {
      method: "POST",
      body: JSON.stringify(objData),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
    if (data.success) {
      toast({
        title: "Added To Cart",
        description: `item ${params.name} successfully added to cart.`,
      });
    } else {
      toast({
        title: "Some Error occured",
      });
    }
  };
  return (
    <>
      <div className="max-w-[320px] sm:max-w-[250px] min-w-[200px] h-fit w-full  shadow-sm outline-gray-400 rounded-sm">
        <Link href={`/product/${params.id}`} className=" flex flex-col">
          <span className="flex flex-col justify-center">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}image/img?id=${params.id}&name=${params.name}&type=product`}
              className=" w-full h-40 object-cover rounded-md"
            />
            <h3 className="my-1 font-semibold text-xl px-3 capitalize">
              {wordlimiter(params.name, 20)}
            </h3>
          </span>
          <span className="flex items-center space-x-2 px-3 text-sm my-1">
            <p className="text-red-400">-40%</p>
            <p>Rs.{params.price}</p>
            <p className="line-through font-extralight">
              Rs.{params.price + 100}
            </p>
          </span>
          <span className="text-xs px-3 font-extralight text-gray-500">
            <p>Get it within 6 days of order</p>
          </span>
        </Link>
        <div className="my-3 flex items-center justify-between gap-5 px-3">
          <button className="outline outline-1 outline-gray-400 py-2 px-3 rounded-sm">
            Buy now
          </button>
          <button
            className="outline outline-1 text-black outline-gray-400 py-2 bg-white px-3 rounded-sm disabled:bg-gray-100 disabled:line-through"
            onClick={() => clickToCart()}
            disabled={!auth}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
