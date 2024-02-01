"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

const FormSchema = z.object({
    qty: z.number(),
})

const itemArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]
interface CartData {
    user_id: number,
    p_id: number,
    id: number,
    qty: number,
    price: number
}
export function SelectForm({ cartDetails, handleChange }: { cartDetails: CartData , handleChange: (e:string) => void }) {
    const [cart, setCart] = useState(cartDetails)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="qty"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={e => handleChange(e)} defaultValue="1">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {itemArray.map((item, key) => (
                                        <SelectItem value={String(item)}>{item}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
