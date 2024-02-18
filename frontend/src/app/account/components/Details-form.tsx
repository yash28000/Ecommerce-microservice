import { Button } from "@/components/ui/button";
import { useAppSelecto } from "../../../../redux/store";
import { AiFillCamera } from "react-icons/ai";
import ImageUploader from "./image-update-dailog";
export default function DetailsForm({ id }: { id: string | null }) {
  const userDetails = useAppSelecto((state) => state.authReducer.value.user);
  return (
    <>
      <h1 className="px-10 text-2xl font-bold my-5"> User Details</h1>
      <form className="flex items-center gap-10">
        <div className="w-[200px] h-[200px] rounded-full relative">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}image/img?id=${userDetails.id}&name=${userDetails.username}&name=user`}
            className="w-full h-full object-cover rounded-full"
          />
          <ImageUploader>
            <Button variant="ghost" className="absolute right-0 bottom-2">
              <AiFillCamera size={30} />
            </Button>
          </ImageUploader>
        </div>

        <div className="px-10 max-w-lg">
          <span className="flex items-center gap-3 my-2">
            <label htmlFor="username">Username</label>
            <input
              placeholder={userDetails.username}
              name="username"
              id="username"
              className="py-3 px-2 text-black w-full outline outline-1 outline-gray-200 bg-transparent"
            />
          </span>
          <span className="flex items-center gap-3 my-2">
            <label htmlFor="email">Email</label>
            <input
              placeholder={userDetails.email}
              name="email"
              id="email"
              className="py-3 px-2 text-black w-full outline outline-1 outline-gray-200 bg-transparent"
            />
          </span>
        </div>
      </form>
    </>
  );
}
