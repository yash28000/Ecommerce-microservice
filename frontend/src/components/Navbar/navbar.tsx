import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CartHover } from './components/cart-hover'
import { useAppSelecto } from '../../../redux/store'
import AccoutMenu from './components/Dropdown-menu'

export default function Navbar() {
    const auth = useAppSelecto((state) => state.authReducer.value.isAuth)
    const user_data = useAppSelecto((state) => state.authReducer.value.user)
    return (
        <div className="h-15 w-full">
            <div className="w-full flex items-center py-2 justify-between px-10">
                <h1 className="text-2xl font-bold">
                    <Link href="/">Ecom</Link>

                </h1>

                <ul className="md:flex items-center space-x-5 hidden px-3">
                    <li className="cursor-pointer font-extralight"><Link href="/">Home</Link></li>
                    <li className="cursor-pointer font-extralight"><Link href="/products">Products</Link></li>
                </ul>
                <span className=" flex items-center space-x-5">

                    {!auth ? (
                        <div className="bg-black py-2 rounded-sm text-white px-5 font-semibold hover:bg-white hover:text-black ease-in-out duration-75">
                            <Link href="/login">
                                Login
                            </Link>
                        </div>
                    ) : (
                        <h3 className='italic font-extralight'>
                            <AccoutMenu>
                                {user_data ? user_data.username : null}
                            </AccoutMenu>

                        </h3>
                    )}

                        {auth && (<button>
                        <CartHover>
                        <Link href="/cart"><AiOutlineShoppingCart size={25} /></Link>
                        </CartHover>

                    </button>)}
                    
                </span>
            </div>
            <hr className='w-full h-1 font-extralight' />
        </div>
    )
}