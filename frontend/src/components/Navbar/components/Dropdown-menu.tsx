import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import { useDispatch } from "react-redux"
import { logOut } from "../../../../redux/features/auth-slice"
import Link from "next/link"
import { useAppSelecto } from "../../../../redux/store"
import ImageUploader from "@/app/account/components/image-update-dailog"
import { DialogSettings } from "./settings-dialog"
Button
export default function AccoutMenu({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()
    const user = useAppSelecto((state) => state.authReducer.value.user)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{children}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={`/account?user=${user.id}`}>
                            Profile
                        </Link>

                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={`/account?user=${user.id}&tab=orders`}>
                            Orders
                        </Link>

                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DialogSettings>
                       <p className="relative flex cursor-pointer hover:bg-gray-100 w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">Settings</p>

                    </DialogSettings>


                </DropdownMenuGroup>
                <DropdownMenuSeparator />


                <DropdownMenuItem>
                    <Button variant="secondary" onClick={() => dispatch(logOut())}>
                        Log out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}